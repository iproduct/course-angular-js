'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;
import { Product } from './models/products.model';

import {AbstractController} from '../commons/controllers/abstract.controller';

export class AddProductController extends AbstractController {
    modalShown: boolean = false;
    productMaster: Product = {
        'id': 0,
        'name': '',
        // 'vendor': '',
        'permalink': '',
        // 'imageUrl': '',
        'snippet': '',
        // 'price': 0,
        'currency': 'USD'
    };
    product: Product;

    // necessary to help AngularJS know about what to inject and in which order
    static $inject: Array<string> = ['$log', '$state'];

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        this.reset();
        logger.debug('AddProductController loaded...');
    }

    toggleModal(): void {
        this.modalShown = !this.modalShown;
    };

    update(): void {
        this.productMaster = angular.copy(this.product);
    };

    reset(): void {
        this.product = angular.copy(this.productMaster);
    };


}
