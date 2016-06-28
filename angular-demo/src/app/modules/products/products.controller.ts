'use strict';

import { AbstractController } from '../commons/controllers/abstract.controller';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

export class ProductsController extends AbstractController {
    customSpice: string = 'wasabi';
    spice: string = 'habanero';

    public static $inject: Array<string> = ['$log', '$state'];

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        logger.debug('Products controller loaded...');
    }

    spicy(spice: string): void {
        this.spice = spice;
    };
}
