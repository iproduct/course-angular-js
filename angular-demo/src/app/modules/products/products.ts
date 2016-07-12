'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {AddProductController} from './add-product.controller';

export const productsModule:IModule = angular.module('productsModule', ['commonsModule', 'ui.router', 'ngResource']);

// import all elements of the module
import './components/foo/foo';
import './components/product-list/product-list';
import './services/product.service';
import './services/products-http.service';
import './components/modal/modal';
import '../commons/directives/hello-simple.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateAddProductUrl:any = require('./add-product.template.html');

productsModule.controller('AddProductController', AddProductController);

productsModule.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('products', {
            parent: 'appMain',
            url: '/products',
            views: {
                'main@': {
                    template: `<product-list></product-list>`,
                },
            },
        }).state('add-product', {
            parent: 'appMain',
            url: '/add-product',
            views: {
                'main@': {
                    controller: AddProductController,
                    controllerAs: '$ctrl',
                    templateUrl: templateAddProductUrl,
                },
            },
        });
},]);

productsModule.run(['$log', (logger: ILogService) => {
    logger.debug('Products module loaded...');
},]);
