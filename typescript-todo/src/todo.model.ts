export default class TodoItem {
	[propName: string]: any;
	
	constructor(
		public id: number = 0,
		public title: string,
		public completed: boolean = false
	) { }
}