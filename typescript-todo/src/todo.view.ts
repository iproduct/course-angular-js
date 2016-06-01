import {qs, qsa, $on, $parent, $delegate} from './utils';
import {TodoItem} from './todo.model.ts';
import TodoTemplate from './todo.template';

interface ItemState {
    [prop: string]: any;
    visible?: boolean;
    completed?: number;
    checked?: boolean;
}


declare global {
    interface DOMStringMap  {
        id : string
    }
}
const _itemId = (element: Element) => parseInt((<HTMLElement>$parent(element, 'li')).dataset.id, 10);

const _setFilter = (currentPage: string) => {
	qs('.filters .selected').className = '';
	qs(`.filters [href="#/${currentPage}"]`).className = 'selected';
};

const _elementComplete = (id: number, completed: boolean) => {
	const listItem = qs(`[data-id="${id}"]`);

	if (!listItem) {
		return;
	}

	listItem.className = completed ? 'completed' : '';

	// In case it was toggled from an event and not by clicking the checkbox
	(<HTMLInputElement>qs('input', listItem)).checked = completed;
};

const _editItem = (id: number, title: string) => {
	const listItem = qs(`[data-id="${id}"]`);

	if (!listItem) {
		return;
	}

	listItem.className += ' editing';

	const input = document.createElement('input');
	input.className = 'edit';

	listItem.appendChild(input);
	input.focus();
	input.value = title;
};


/**
 * View that abstracts away the browser's DOM completely.
 * It has two simple entry points:
 *
 *   - bind(eventName, handler)
 *     Takes a todo application event and registers the handler
 *   - render(command, parameterObject)
 *     Renders the given command with the options
 */
export default class TodoView {
    ENTER_KEY = 13;
    ESCAPE_KEY = 27;

    $todoList = <HTMLElement> qs('.todo-list');
    $todoItemCounter = <HTMLElement> qs('.todo-count');
    $clearCompleted = <HTMLElement> qs('.clear-completed');
    $main = <HTMLElement> qs('.main');
    $footer = <HTMLElement> qs('.footer');
    $toggleAll = <HTMLInputElement> qs('.toggle-all');
    $newTodo = <HTMLInputElement> qs('.new-todo');

    viewCommands: {[key:string]: any} = {
        showEntries: (parameter: Array<TodoItem>) => this.$todoList.innerHTML = this.template.show(parameter),
        removeItem: (parameter: number) => this._removeItem(parameter),
        updateElementCount: (parameter: number) => this.$todoItemCounter.innerHTML = this.template.itemCounter(parameter),
        clearCompletedButton: (parameter: ItemState) => this._clearCompletedButton(parameter.completed, parameter.visible),
        contentBlockVisibility: (parameter: ItemState) => this.$main.style.display = this.$footer.style.display = parameter.visible ? 'block' : 'none',
        toggleAll: (parameter: ItemState) => this.$toggleAll.checked = parameter.checked,
        setFilter: (parameter: string) => _setFilter(parameter),
        clearNewTodo: (parameter: any) => this.$newTodo.value = '',
        elementComplete: (item: TodoItem) => _elementComplete(item.id, item.completed),
        editItem: (parameter: TodoItem) => _editItem(parameter.id, parameter.title),
        editItemDone: (parameter: TodoItem) => this._editItemDone(parameter.id, parameter.title),
    };
        
	constructor(public template: TodoTemplate) {	}

	_removeItem(id: number) {
		const elem = qs(`[data-id="${id}"]`);

		if (elem) {
			this.$todoList.removeChild(elem);
		}
	}

	_clearCompletedButton(completedCount: number, visible: boolean) {
		this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
		this.$clearCompleted.style.display = visible ? 'block' : 'none';
	}

	_editItemDone(id: number, title: string) {
		const listItem = qs(`[data-id="${id}"]`);

		if (!listItem) {
			return;
		}

		const input = qs('input.edit', listItem);
		listItem.removeChild(input);

		listItem.className = listItem.className.replace(' editing', '');

		qsa('label', listItem).forEach(label => label.textContent = title);
	}

	render(viewCmd: string, parameter: any) {
		this.viewCommands[viewCmd](parameter);
	}

	_bindItemEditDone(handler: (item: TodoItem) => void) {
		const self = this;

		$delegate(self.$todoList, 'li .edit', 'blur', function () {
			if (!this.dataset.iscanceled) {
				handler({
					id: _itemId(this),
					title: <string> this.value,
                    completed: false
				});
			}
		});

		// Remove the cursor from the input when you hit enter just like if it were a real form
		$delegate(self.$todoList, 'li .edit', 'keypress', function (event) {
			if ((<KeyboardEvent> event).keyCode === self.ENTER_KEY) {
				this.blur();
			}
		});
	}

	_bindItemEditCancel(handler: (arg: any) => void) {
		const self = this;

		$delegate(self.$todoList, 'li .edit', 'keyup', function (event) {
			if ((<KeyboardEvent> event).keyCode === self.ESCAPE_KEY) {
				const id = _itemId(this);
				this.dataset.iscanceled = true;
				this.blur();

				handler({ id });
			}
		});
	}

	bind(event: string, handler: (arg: any) => void) {
		switch (event) {
			case 'newTodo':
				$on(this.$newTodo, 'change', () => handler(this.$newTodo.value));
				break;

			case 'removeCompleted':
				$on(this.$clearCompleted, 'click', handler);
				break;

			case 'toggleAll':
				$on(this.$toggleAll, 'click', function () {
					handler({completed: this.checked});
				});
				break;

			case 'itemEdit':
				$delegate(this.$todoList, 'li label', 'dblclick', function () {
					handler({id: _itemId(this)});
				});
				break;

			case 'itemRemove':
				$delegate(this.$todoList, '.destroy', 'click', function () {
					handler({id: _itemId(this)});
				});
				break;

			case 'itemToggle':
				$delegate(this.$todoList, '.toggle', 'click', function () {
					handler({
						id: _itemId(this),
						completed: this.checked
					});
				});
				break;

			case 'itemEditDone':
				this._bindItemEditDone(handler);
				break;

			case 'itemEditCancel':
				this._bindItemEditCancel(handler);
				break;
		}
	}
}
