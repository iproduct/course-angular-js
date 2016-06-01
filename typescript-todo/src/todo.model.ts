export interface ItemData {
	[propName: string]: any;
	id?: number;
	title?: string;
	completed?: boolean;
}

export class TodoItem implements ItemData{
	[propName: string]: any;
	
	constructor(
		public id: number = 0,
		public title: string,
		public completed: boolean = false
	) { }
}