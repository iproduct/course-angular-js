import {TodoItem} from './todo.model.ts';

const htmlEscapes: { [key: string]: string } = {
	'&': '&amp',
	'<': '&lt',
	'>': '&gt',
	'"': '&quot',
	'\'': '&#x27',
	'`': '&#x60'
};

const reUnescapedHtml = /[&<>"'`]/g;
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);

const escape = (str: string) => (str && reHasUnescapedHtml.test(str)) ? str.replace(reUnescapedHtml, escapeHtmlChar) : str;
const escapeHtmlChar = (chr:string) => htmlEscapes[chr];

export default class TodoTemplate {
    defaultTemplate = `
			<li data-id="{{id}}" class="{{completed}}">
				<div class="view">
					<input class="toggle" type="checkbox" {{checked}}>
					<label>{{title}}</label>
					<button class="destroy"></button>
				</div>
			</li>
		`;
	constructor() {	}

	/**
	 * Creates an <li> HTML string and returns it for placement in your app.
	 *
	 * NOTE: In real life you should be using a templating engine such as Mustache
	 * or Handlebars, however, this is a vanilla JS example.
	 *
	 * @param {object} data The object containing keys you want to find in the
	 *                      template to replace.
	 * @returns {string} HTML String of an <li> element
	 *
	 * @example
	 * view.show({
		 *	id: 1,
		 *	title: "Hello World",
		 *	completed: 0,
		 * })
	 */
	show(data: Array<TodoItem>){
		const view = data.map(d => {
			const template = this.defaultTemplate;
			const completed = d.completed ? 'completed' : '';
			const checked = d.completed ? 'checked' : '';

			return this.defaultTemplate
				.replace(new RegExp('{{id}}'), '' + d.id)
				.replace(new RegExp('{{title}}'), escape(d.title))
				.replace(new RegExp('{{completed}}'), completed)
				.replace(new RegExp('{{checked}}'), checked);
		});

		return view.join('');
	}

	/**
	 * Displays a counter of how many to dos are left to complete
	 *
	 * @param {number} activeTodos The number of active todos.
	 * @returns {string} String containing the count
	 */
	itemCounter(activeTodos: number){
		const plural = activeTodos === 1 ? '' : 's';
		return `<strong>${activeTodos}</strong> item${plural} left`;
	}

	/**
	 * Updates the text within the "Clear completed" button
	 *
	 * @param  {[type]} completedTodos The number of completed todos.
	 * @returns {string} String containing the count
	 */
	clearCompletedButton(completedTodos: number){
		return (completedTodos > 0) ? 'Clear completed' : '';
	}
}
