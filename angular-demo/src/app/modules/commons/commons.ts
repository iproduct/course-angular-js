'use strict';

import IModule = angular.IModule;
import ILogService = angular.ILogService;

// the import of every element of this module should be included below

export const commonsModule: IModule = angular.module('commonsModule', []);

import './directives/permalink-validator.directive';
import './directives/permalink-unique-validator.directive';

commonsModule.run(['$log', (logger: ILogService) => {
    logger.debug('Commons module loaded...');
},]);
