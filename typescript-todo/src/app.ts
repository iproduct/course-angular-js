import * as utils from "./utils";
import TodoMain from "./todo-main.ts";

const todo: TodoMain = new TodoMain("todos-typescript");

const $on: utils.TodoEventHandler = utils.$on;
const setView: ()=>any = () => todo.controller.setView(document.location.hash);

$on(window, "load", setView);
$on(window, "hashchange", setView);



