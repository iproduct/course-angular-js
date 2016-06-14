'use strict';

import * as angular from 'angular';
import {CapitalizerService} from './capitalizer.service';

angular.module('capitalizer', [])
    .service('CapitalizerService', CapitalizerService);

// function capitalizerService($log: ng.ILogService): CapitalizerService {
//     let capitalize = (str: string): string => {
//         $log.info('\'' + str + '\' capitalized to \'' + str.toUpperCase() + '\'');
//         return str.toUpperCase();
//     };
//     return {
//         capitalize: capitalize
//     };
// }




