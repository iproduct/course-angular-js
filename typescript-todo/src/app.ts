import {TodoController} from './todo.controller';
import {TodoStore} from './todo-store';
import {TodoRepository} from './todo-repository';
import * as utils from './utils';
import TodoTemplate from './todo.template';
import TodoView from './todo.view';

const $on = utils.$on;
const setView = () => todo.controller.setView(document.location.hash);

class Todo {
    store: TodoStore;
    repository: TodoRepository;
    controller: TodoController;
    template: TodoTemplate;
    view: TodoView;
    
	/**
	 * Init new Todo List
	 * @param  {string} The name of your list
	 */
	constructor(name: string) {
		this.store = new TodoStore(name);
		this.repository = new TodoRepository(this.store);

		this.template = new TodoTemplate();
		this.view = new TodoView(this.template);

		this.controller = new TodoController(this.repository, this.view);
	}
}

const todo = new Todo('todos-typescript');

$on(window, 'load', setView);
$on(window, 'hashchange', setView);
