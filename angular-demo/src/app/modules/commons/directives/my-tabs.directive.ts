'use strict';

import IDirective = angular.IDirective;

import { commonsModule } from '../commons';
import { MyTabsController } from './my-tabs.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateMyTabs: any = require('./my-tabs.html');

commonsModule.directive('myTabs', function (): IDirective {
  console.log('!!!  Registering myTabs directive ...');
  return {
    restrict: 'E',
    transclude: true,
    bindToController: true,
    scope: {},
    controller: MyTabsController,
    controllerAs: '$ctrl',
    templateUrl: templateMyTabs
  };
});
