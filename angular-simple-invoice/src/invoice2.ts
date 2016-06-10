/// <reference path="../typings/globals/angular/index.d.ts" />
/// <reference path="./finance2.ts" />

'use strict';
import * as angular from 'angular';
import './finance2';
import {CurrencyConverter} from './finance2';

angular.module('invoice2', ['finance2'])
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





