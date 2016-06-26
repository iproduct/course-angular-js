'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {HomeController} from './home.controller';

export const homeModule:IModule = angular.module('homeModule', ['commonsModule']);

// import all elements of the module
import './components/foo/foo';
import './components/modal/modal';
import '../commons/directives/hello-simple.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateHomeUrl:any = require('./home.template.html');

homeModule.controller('HomeController', HomeController);

homeModule.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('home', {
            parent: 'appMain',
            url: '/home',
            views: {
                'main@': {
                    controller: HomeController,
                    controllerAs: 'vm',
                    templateUrl: templateHomeUrl,
                },
            },
        });
},]);

homeModule.run(['$log', (logger:ILogService) => {
    logger.debug('Home module loaded...');
},]);
