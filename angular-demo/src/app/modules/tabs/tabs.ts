'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {TabsController} from './tabs.controller';

export const tabsModule:IModule = angular.module('tabsModule', ['commonsModule', 'ui.router']);

// import all elements of the module
import '../commons/directives/my-tabs.directive';
import '../commons/directives/my-pane.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateTabsUrl:any = require('./tabs.template.html');

tabsModule.controller('TabsController', TabsController);

tabsModule.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('tabs', {
            parent: 'appMain',
            url: '/tabs',
            views: {
                'main@': {
                    controller: TabsController,
                    controllerAs: '$ctrl',
                    templateUrl: templateTabsUrl,
                },
            },
        });
},]);

tabsModule.run(['$log', (logger:ILogService) => {
    logger.debug('Tabs demo module loaded...');
},]);
