'use strict';

import { AbstractController } from '../commons/controllers/abstract.controller';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

export class ProductsController extends AbstractController {

    public static $inject: Array<string> = ['$log', '$state'];

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        logger.debug('Products controller loaded...');
    }

}
