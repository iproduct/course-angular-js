'use strict';

import * as angular from 'angular';

import {TodoCtrl} from './controllers/TodoCtrl';
import {todoBlur} from './directives/TodoBlur';
import {todoEscape} from './directives/TodoEscape';
import {todoFocus} from './directives/TodoFocus';
import {TodoStorage} from './services/TodoStorage';

/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */
angular.module('todomvc', [])
    .controller('todoCtrl', TodoCtrl)
    .directive('todoBlur', todoBlur)
    .directive('todoFocus', todoFocus)
    .directive('todoEscape', todoEscape)
    .service('todoStorage', TodoStorage);
