'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import { AbstractController } from '../../commons/controllers/abstract.controller';

export class MyPaneController extends AbstractController {

  // necessary to help AngularJS know about what to inject and in which order
  static $inject: Array<string> = ['$log', '$state'];

  selected: boolean = false;
  
  public constructor(logger: ILogService, $state: IStateService) {
    super(logger, $state);
    logger.debug('MyPaneController loaded ...');
  }
 
}
