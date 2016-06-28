'use strict';

import '../product-core/product-core.module';
import {ProductListController} from './product-list.controller';

// Define the `productList` module
export const productListModule = angular
    .module('productListModule', ['commonsModule', 'productCoreModule',  'ui.router']);

// Pre-loading the html templates into the Angular's $templateCache
const templateProductListUrl:any = require('./product-list.template.html');

productListModule.controller('ProductsController', ProductListController);

productListModule.config(['$stateProvider', ($stateProvider:ng.ui.IStateProvider) => {
    $stateProvider
        .state('products', {
            parent: 'appMain',
            url: '/products',
            views: {
                'main@': {
                    controller: ProductListController,
                    controllerAs: '$ctrl',
                    templateUrl: templateProductListUrl,
                },
            },
        });
},]);

productListModule.run(['$log', (logger:ng.ILogService) => {
    logger.debug('Products module loaded...');
},]);
