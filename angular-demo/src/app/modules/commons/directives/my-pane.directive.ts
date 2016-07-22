'use strict';

import IDirective = angular.IDirective;

import { commonsModule } from '../commons';
import { MyTabsController } from './my-tabs.controller';
import { MyPaneController } from './my-pane.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateMyPane: any = require('./my-pane.html');

commonsModule.directive('myPane', function (): IDirective {
    console.log('!!!  Registering myPabe directive ...');
    return {
    require: ['myPane', '^^myTabs'],
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    bindToController: true,
    controller: MyPaneController,
    controllerAs: '$ctrl',
    link: function(scope: ng.IScope, element: Element, attrs: ng.IAttributes, 
      [paneCtrl, tabsCtrl]: [MyPaneController, MyTabsController]): void {
      tabsCtrl.addPane(paneCtrl);
    },
    templateUrl: templateMyPane
  };
});
