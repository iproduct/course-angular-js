'use strict';

import { AbstractController } from '../../../commons/controllers/abstract.controller';
import { Product, ProductResourceClass /*, ProductResource */ } from '../../models/products.model';
import { ProductsHttpService } from '../../services/products-http.service';

export class ProductListController extends AbstractController {
    // products: ng.resource.IResourceArray<ProductResource>;
    products: Product[] = [];
    orderProp: string;
    public static $inject: Array<string> = ['$log', '$state', 'ProductResourceClass', 'ProductsHttpService'];

    public constructor(logger: ng.ILogService, $state: ng.ui.IStateService,
            private productResourceClass: ProductResourceClass, productsHttpService: ProductsHttpService) {
        super(logger, $state);
        // this.products = productResourceClass.query();

        productsHttpService.getProducts().then(
            (data: Product[]) => {
                // this.logger.debug(data);
                this.products = data;
            },
            (response: any) => {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }
        );

        logger.debug('ProductListController loaded');
        this.orderProp = 'id';
    }
}

