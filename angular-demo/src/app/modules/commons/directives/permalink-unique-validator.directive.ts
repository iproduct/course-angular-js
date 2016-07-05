'use strict';

import {commonsModule} from '../commons';
import IDirective = angular.IDirective;

commonsModule.directive('permalinkUnique', ['$log', '$q', '$timeout',
    function ($log: ng.ILogService, $q: ng.IQService, $timeout: ng.ITimeoutService): IDirective {
        $log.info('!!!  Registering permalink-unique validator ...');
        return {
            require: 'ngModel',
            link: function (scope: ng.IScope, elm: HTMLElement, attrs: Attr, ctrl: ng.INgModelController): void {
                let permalinks = ['motorola-xoom-with-wi-fi', 'motorola-xoom', 'motorola-atrix-4g',
                'dell-streak-7', 'samsung-gem', 'dell-venue', 'nexus-s', 'lg-axis', 'samsung-galaxy-tab',
                'samsung-showcase-a-galaxy-s-phone', 'droid-2-global-by-motorola', 'droid-pro-by-motorola',
                'motorola-bravo-with-motoblur', 'motorola-defy-with-motoblur', 't-mobile-mytouch-4g',
                'samsung-mesmerize-a-galaxy-s-phone', 'sanyo-zio', 'samsung-transform', 't-mobile-g2',
                'motorola-charm-with-motoblur'];
                ctrl.$asyncValidators['permalinkUnique'] =
                    function (modelValue: string, viewValue: string): ng.IPromise<boolean> {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty model valid
                            return $q.when(true);
                        }

                        let def = $q.defer();

                        $timeout(function (): void {
                            // Mock a delayed response
                            if (permalinks.indexOf(modelValue) === -1) {
                                // The username is available
                                def.resolve();
                            } else {
                                def.reject();
                            }

                        },       2000);

                        return def.promise;
                    };
            }
        };
    }]);

