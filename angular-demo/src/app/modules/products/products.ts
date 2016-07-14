'use strict';

import IStateProvider = angular.ui.IStateProvider;
import IModule = angular.IModule;
import ILogService = angular.ILogService;

export const productsModule:IModule = angular.module('productsModule', ['commonsModule', 'ui.router', 'ngResource']);

// import all elements of the module
import './components/foo/foo';
import './components/product-list/product-list';
import './components/add-product/add-product';
import './services/product.service';
import './services/products-http.service';
import '../commons/directives/hello-simple.directive';
import './filters/fraction.filter';

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
                   template: `<add-product></add-product>`,
                },
            },
        });
},]);

productsModule.run(['$log', (logger: ILogService) => {
    logger.debug('Products module loaded...');
},]);
