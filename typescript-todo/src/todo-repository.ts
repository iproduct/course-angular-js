import {TodoItem, ItemData} from './todo.model.ts';
import { TodoStore, QueryCallback, UpdateCallback } from './todo-store';

export interface TodosState {
	active: number;
	completed: number;
	total: number;
}

export interface TodosStateCallback {
	(state: TodosState) : void
}

/**
 * Creates a new Model instance and hooks up the storage.
 * @constructor
 * @param {object} storage A reference to the client side storage class
 */
export class TodoRepository {
	constructor(public store: TodoStore) {
	}

	/**
	 * Creates a new todo model
	 *
	 * @param {string} [title] The title of the task
	 * @param {function} [callback] The callback to fire after the model is created
	 */
	create(title: string = '', callback: UpdateCallback) {
		const newItem = new TodoItem(0, title.trim(), false);
		this.store.save(newItem, callback);
	}

	/**
	 * Finds and returns a model in storage. If no query is given it'll simply
	 * return everything. If you pass in a string or number it'll look that up as
	 * the ID of the model to find. Lastly, you can pass it an object to match
	 * against.
	 *
	 * @param {string|number|object} [query] A query to match models against
	 * @param {function} [callback] The callback to fire after the model is found
	 *
	 * @example
	 * model.read(1, func) // Will find the model with an ID of 1
	 * model.read('1') // Same as above
	 * //Below will find a model with foo equalling bar and hello equalling world.
	 * model.read({ foo: 'bar', hello: 'world' })
	 */
	read(query: ItemData | string | number , callback: QueryCallback) {
		const queryType: string = typeof query;

		if (query === undefined) {
			this.store.findAll(callback);
		} else if (queryType === 'string' || queryType === 'number') {
			let queryId: number = parseInt(query.toString(), 10);
			this.store.find({ id: queryId }, callback);
		} else {
			this.store.find(<ItemData>query, callback);
		}
	}

	/**
	 * Updates a model by giving it an ID, data to update, and a callback to fire when
	 * the update is complete.
	 *
	 * @param {number} id The id of the model to update
	 * @param {object} data The properties to update and their new value
	 * @param {function} callback The callback to fire when the update is complete.
	 */
	update(id: number, data: ItemData, callback: UpdateCallback) {
		this.store.save(data, callback, id);
	}

	/**
	 * Removes a model from storage
	 *
	 * @param {number} id The ID of the model to remove
	 * @param {function} callback The callback to fire when the removal is complete.
	 */
	remove(id: number, callback: QueryCallback) {
		this.store.remove(id, callback);
	}

	/**
	 * WARNING: Will remove ALL data from storage.
	 *
	 * @param {function} callback The callback to fire when the storage is wiped.
	 */
	removeAll(callback: QueryCallback) {
		this.store.drop(callback);
	}

	/**
	 * Returns a count of all todos
	 */
	getCount(callback: TodosStateCallback) {
		const todos: TodosState = {
			active: 0,
			completed: 0,
			total: 0
		};

		this.store.findAll(data => {
			for (let todo of data) {
				if (todo.completed) {
					todos.completed++;
				} else {
					todos.active++;
				}

				todos.total++;
			}

			callback(todos);
		});
	}
}
