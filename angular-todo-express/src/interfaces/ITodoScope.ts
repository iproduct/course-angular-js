import {TodoItem} from '../models/TodoItem';
import {TodoCtrl} from '../controllers/TodoCtrl';

export interface ITodoScope extends ng.IScope {
	todos: TodoItem[];
	newTodo: string;
	editedTodo: TodoItem;
	originalTodo: TodoItem;
	remainingCount: number;
	doneCount: number;
	allChecked: boolean;
	reverted: boolean;
	statusFilter: { completed?: boolean };
	location: ng.ILocationService;
	vm: TodoCtrl;
}

