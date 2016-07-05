'use strict';

import {commonsModule} from '../commons';
import IDirective = angular.IDirective;

const INTEGER_REGEXP = /^\w+(\-\w+)*$/;
commonsModule.directive('permalink', ['$log', function ($log: ng.ILogService): IDirective {
    $log.info('!!!  Registering permalink validator ...');
    return {
        require: 'ngModel',
        link: function (scope: ng.IScope, elm: HTMLElement, attrs: Attr, ctrl: ng.INgModelController): void {
            ctrl.$validators['permalink'] =
                function (modelValue: string, viewValue: string): boolean {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
        }
    };
}]);

