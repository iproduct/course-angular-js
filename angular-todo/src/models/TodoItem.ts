'use strict';

export class TodoItem {
    constructor(
        public id: number = 0,
        public title: string,
        public completed: boolean = false
    ) { }
}

export interface TodoItemData {
    [propName: string]: number | boolean | string;
	id?: number;
	title?: string;
	completed?: boolean;
}

