'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

import {ProductsController} from './products.controller';
import {AddProductController} from './add-product.controller';

export const productsModule:IModule = angular.module('productsModule', ['commonsModule', 'ui.router', 'ngResource']);

// import all elements of the module
import './components/foo/foo';
import './components/product-list/product-list';
import './services/product.service';
import './components/modal/modal';
import '../commons/directives/hello-simple.directive';

// Pre-loading the html templates into the Angular's $templateCache
const templateProductsUrl:any = require('./products.template.html');

productsModule.controller('ProductsController', ProductsController);

productsModule.config(['$stateProvider', ($stateProvider:IStateProvider) => {
    $stateProvider
        .state('products', {
            parent: 'appMain',
            url: '/products',
            views: {
                'main@': {
                    controller: ProductsController,
                    controllerAs: '$ctrl',
                    templateUrl: templateProductsUrl,
                },
            },
        }).state('add-product', {
            parent: 'appMain',
            url: '/add-product',
            views: {
                'main@': {
                    controller: AddProductController,
                    controllerAs: '$ctrl',
                    templateUrl: templateProductsUrl,
                },
            },
        });
},]);

productsModule.run(['$log', (logger: ILogService) => {
    logger.debug('Products module loaded...');
},]);
