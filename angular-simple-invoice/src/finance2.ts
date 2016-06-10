'use strict';
import * as angular from 'angular';

export interface CurrencyConverter {
    currencies: Array<string>;
    convert: (amount: number, inCurr: string, outCurr: string) => number;
}

angular.module('finance2', [])
  .factory('currencyConverter', function () {
    this.currencies = ['USD', 'EUR', 'CNY'];
    this.usdToForeignRates = {
      CNY: 6.09,
      EUR: 0.74,
      USD: 1
    };
    let convert = (amount: number, inCurr: string, outCurr: string) => {
      return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
    };

    return {
      convert: convert,
      currencies: this.currencies
    };
  });
