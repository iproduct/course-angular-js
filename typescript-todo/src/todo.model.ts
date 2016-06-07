export interface ItemData {
    [propName: string]: number | boolean | string | ItemData;
	id?: number;
	title?: string;
	completed?: boolean;
	// next?: ItemData;
}

export class TodoItem implements ItemData{
	[propName: string]: any;
	
	constructor(
		public id: number = 0,
		public title: string,
		public completed: boolean = false
	) { }
}