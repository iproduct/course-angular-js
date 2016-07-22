'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import { AbstractController } from '../../commons/controllers/abstract.controller';
import { MyPaneController } from './my-pane.controller';

export class MyTabsController extends AbstractController {
  panes: MyPaneController[] = [];

  // necessary to help AngularJS know about what to inject and in which order
  static $inject: Array<string> = ['$log', '$state'];

  public constructor(logger: ILogService, $state: IStateService) {
    super(logger, $state);
    logger.debug('AddProductController loaded ...');
  }

  select(paneCtrl: MyPaneController): void {
    angular.forEach(this.panes, (pane: MyPaneController) => {
      pane.selected = false;
    });
    paneCtrl.selected = true;
  };

  addPane(paneCtrl: MyPaneController): void {
  if (this.panes.length === 0) {
    this.select(paneCtrl);
  }
  this.panes.push(paneCtrl);
};
 
}
