'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {FoodController} from './food.controller';

export const demo01Module:IModule = angular.module('demo01Module', ['commonsModule', 'ui.router']);

// import all elements of the module
import './components/foo/foo';
import './components/modal/modal';
import '../commons/directives/hello-simple.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateHomeUrl:any = require('./demo.template.html');

demo01Module.controller('FoodController', FoodController);

demo01Module.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('demo01', {
            parent: 'appMain',
            url: '/demo01',
            views: {
                'main@': {
                    controller: FoodController,
                    controllerAs: 'vm',
                    templateUrl: templateHomeUrl,
                },
            },
        });
},]);

demo01Module.run(['$log', (logger:ILogService) => {
    logger.debug('Demo01 module loaded...');
},]);
