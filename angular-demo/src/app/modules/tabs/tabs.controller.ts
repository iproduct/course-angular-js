'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from '../commons/controllers/abstract.controller';

export class TabsController extends AbstractController {

    public static $inject: Array<string> = ['$log', '$state'];

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        logger.debug('TabsController loaded...');
    }

}
