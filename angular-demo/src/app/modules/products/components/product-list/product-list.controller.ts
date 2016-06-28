'use strict';

import { AbstractController } from '../../../commons/controllers/abstract.controller';
import {ProductResourceClass, ProductResource} from '../../models/products.model';

export class ProductListController extends AbstractController {
    products: ng.resource.IResourceArray<ProductResource>;
    orderProp: string;
    public static $inject: Array<string> = ['$log', '$state', 'ProductResourceClass'];

    public constructor(logger: ng.ILogService, $state: ng.ui.IStateService, private productResourceClass: ProductResourceClass) {
        super(logger, $state);
        this.products = productResourceClass.query();
        logger.debug('ProductListController loaded');
        this.orderProp = 'id';
    }
}

