
'use strict';
import {TodoItem} from '../models/TodoItem';
import {ITodoStorage} from '../interfaces/ITodoStorage';

/**
 * Services that persists and retrieves TODOs from localStorage.
 */
export class TodoStorageHttp implements ITodoStorage {

    STORAGE_ID = 'todos-angularjs-typescript';

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject = [
        '$http',
    ];

    // dependencies are injected via AngularJS $injector
    // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
    constructor(
        private $http: ng.IHttpService
    ) {
    }

    get(): TodoItem[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    put(todos: TodoItem[]) {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }
}
