import { TodoRepository } from './todo-repository.ts';
import TodoView from './todo.view.ts';
import {TodoItem} from './todo.model.ts';

export class TodoController {
	[prop: string]: any;
	_activeRoute: string;
	_lastActiveRoute: string;
	
	/**
	 * Take a repository & view, then act as controller between them
	 * @param  {object} repository The repository instance
	 * @param  {object} view  The view instance
	 */
	constructor(public repository: TodoRepository, public view: TodoView) {

		this.view.bind('newTodo', title => this.addItem(title));
		this.view.bind('itemEdit', item => this.editItem(item.id));
		this.view.bind('itemEditDone', item => this.editItemSave(item.id, item.title));
		this.view.bind('itemEditCancel', item => this.editItemCancel(item.id));
		this.view.bind('itemRemove', item => this.removeItem(item.id));
		this.view.bind('itemToggle', item => this.toggleComplete(item.id, item.completed));
		this.view.bind('removeCompleted', () => this.removeCompletedItems());
		this.view.bind('toggleAll', status => this.toggleAll(status.completed));
	}

	/**
	 * Load & Initialize the view
	 * @param {string}  '' | 'active' | 'completed'
	 */
	setView(hash: string) {
		const route = hash.split('/')[1];
		const page = route || '';
		this._updateFilter(page);
	}

	/**
	 * Event fires on load. Gets all items & displays them
	 */
	showAll() {
		this.repository.read(null, data => this.view.render('showEntries', data));
	}
	
	/**
	 * Renders all active tasks
	 */
	showActive() {
		this.repository.read({completed: false}, data => this.view.render('showEntries', data));
	}

	/**
	 * Renders all completed tasks
	 */
	showCompleted() {
		this.repository.read({completed: true}, data => this.view.render('showEntries', data));
	}

	/**
	 * An event to fire whenever you want to add an item. Simply pass in the event
	 * object and it'll handle the DOM insertion and saving of the new item.
	 */
	addItem(title: string) {
		if (title.trim() === '') {
			return;
		}

		this.repository.create(title, () => {
			this.view.render('clearNewTodo', null);
			this._filter(true);
		});
	}

	/*
	 * Triggers the item editing mode.
	 */
	editItem(id: number) {
		this.repository.read(id, data => {
			const title = data[0].title;
			this.view.render('editItem', {id, title});
		});
	}

	/*
	 * Finishes the item editing mode successfully.
	 */
	editItemSave(id: number, title: string) {
		title = title.trim();

		if (title.length !== 0) {
			let editedItem = new TodoItem(id, title);
			this.repository.update(id, editedItem, () => {
				this.view.render('editItemDone', editedItem);
			});
		} else {
			this.removeItem(id);
		}
	}

	/*
	 * Cancels the item editing mode.
	 */
	editItemCancel(id: number) {
		this.repository.read(id, data => {
			const title = data[0].title;
			this.view.render('editItemDone', {id, title});
		});
	}

	/**
	 * Find the DOM element with given ID,
	 * Then remove it from DOM & Storage
	 */
	removeItem(id: number) {
		this.repository.remove(id, () => this.view.render('removeItem', id));
		this._filter();
	}

	/**
	 * Will remove all completed items from the DOM and storage.
	 */
	removeCompletedItems() {
		this.repository.read({completed: true}, data => {
			for (let item of data) {
				this.removeItem(item.id);
			}
		});

		this._filter();
	}

	/**
	 * Give it an ID of a repository and a checkbox and it will update the item
	 * in storage based on the checkbox's state.
	 *
	 * @param {number} id The ID of the element to complete or uncomplete
	 * @param {object} item The item to change completenes state
	 * @param {boolean|undefined} silent Prevent re-filtering the todo items
	 */
	toggleComplete(id: number, completed: boolean, silent?: boolean) {
		this.repository.update(id, {completed: completed}, item => {
			this.view.render('elementComplete', item);
		});

		if (!silent) {
			this._filter();
		}
	}

	/**
	 * Will toggle ALL checkboxes' on/off state and completeness of repositories.
	 * Just pass in the event object.
	 */
	toggleAll(completed: boolean) {
		this.repository.read({completed: !completed}, items => {
			for (let item of items) {
				this.toggleComplete(item.id, completed, true);
			}
		});

		this._filter();
	}

	/**
	 * Updates the pieces of the page which change depending on the remaining
	 * number of todos.
	 */
	_updateCount() {
		this.repository.getCount(todos => {
			const completed = todos.completed;
			const visible = completed > 0;
			const checked = completed === todos.total;

			this.view.render('updateElementCount', todos.active);
			this.view.render('clearCompletedButton', {completed, visible});

			this.view.render('toggleAll', {checked});
			this.view.render('contentBlockVisibility', {visible: todos.total > 0});
		});
	}

	/**
	 * Re-filters the todo items, based on the active route.
	 * @param {boolean|undefined} force  forces a re-painting of todo items.
	 */
	_filter(force? : boolean) {
		const active = this._activeRoute;
		const activeRoute = active.charAt(0).toUpperCase() + active.substr(1);

		// Update the elements on the page, which change with each completed todo
		this._updateCount();

		// If the last active route isn't "All", or we're switching routes, we
		// re-create the todo item elements, calling:
		//   this.show[All|Active|Completed]()
		if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
			this['show' + activeRoute]();
		}

		this._lastActiveRoute = activeRoute;
	}

	/**
	 * Simply updates the filter nav's selected states
	 */
	_updateFilter(currentPage: string) {
		// Store a reference to the active route, allowing us to re-filter todo
		// items as they are marked complete or incomplete.
		this._activeRoute = currentPage;

		if (currentPage === '') {
			this._activeRoute = 'All';
		}

		this._filter();

		this.view.render('setFilter', currentPage);
	}
}
