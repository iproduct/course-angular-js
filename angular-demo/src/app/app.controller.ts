'use strict';

import {AbstractController} from './modules/commons/controllers/abstract.controller';
import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

// i18n
import ITranslateService = angular.translate.ITranslateService;

// controller
export class AppController extends AbstractController {

    // necessary to help AngularJS know about what to inject and in which order
    public static $inject:Array<string> = ['$log', '$state', '$translate'];

    public constructor(logger:ILogService, $state:IStateService, private $translate: ITranslateService) {
        super(logger, $state);
        logger.debug('Application bootstrapped!');
    }

    changeLanguage(key:string): void {
        this.$translate.use(key);
    };
}
