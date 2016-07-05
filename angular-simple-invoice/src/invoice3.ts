'use strict';

import * as angular from 'angular';
import {CurrencyConverter} from './finance3';
import './finance3';

angular.module('invoice3', ['finance3'])
  .controller('InvoiceController', ['currencyConverter', function (currencyConverter: CurrencyConverter): void {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = currencyConverter.currencies;

    this.total = function total(outCurr: string) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay(): void {
      window.alert('Thanks!');
    };
  }]);





