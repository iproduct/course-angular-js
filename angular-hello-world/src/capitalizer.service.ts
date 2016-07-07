'use strict';

export interface ICapitalizerService {
    capitalize: (s: string) => string;
}

export class CapitalizerService implements ICapitalizerService {
    constructor(private $log: ng.ILogService) {}
    capitalize(str: string): string {
        this.$log.info('\'' + str + '\' capitalized to \'' + str.toUpperCase() + '\'');
        return str.toUpperCase();
    };
}

CapitalizerService.$inject=['$log'];
