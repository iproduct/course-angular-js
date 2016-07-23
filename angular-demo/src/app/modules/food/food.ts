'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {FoodController} from './food.controller';

export const foodModule:IModule = angular.module('foodModule', ['commonsModule', 'ui.router']);

// import all elements of the module
import '../commons/directives/hello-simple.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateHomeUrl:any = require('./food.template.html');

foodModule.controller('FoodController', FoodController);

foodModule.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('food', {
            parent: 'appMain',
            url: '/food',
            views: {
                'main@': {
                    controller: FoodController,
                    controllerAs: 'vm',
                    templateUrl: templateHomeUrl,
                },
            },
        });
},]);

foodModule.run(['$log', (logger:ILogService) => {
    logger.debug('Food demo module loaded...');
},]);
