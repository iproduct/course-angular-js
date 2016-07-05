'use strict';

import * as angular from 'angular';
import {CurrencyConverter} from './finance3';
import './finance3';
import './on-enter.directive';

angular.module('invoice4', ['finance3', 'keyEvents'])
  .controller('InvoiceController', ['currencyConverter', function (currencyConverter: CurrencyConverter): void {
    this.qty = 1;
    this.cost = 1;
    this.inCurr = 'GBP';
    this.currencies = currencyConverter.currencies;
    this.newCurrency = '';

    this.total = function total(outCurr: string) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay(): void {
      window.alert('Thanks!');
    };
    this.addCurrency = function addCurrency(): void {
      this.currencies.push(this.newCurrency);
      this.newCurrency = '';
      currencyConverter.refresh();
    };
    this.keypressed = function keypressed(keyCode: number): void {
        if(keyCode === 13) {
          this.addCurrency();
        }
    };
  }]);





