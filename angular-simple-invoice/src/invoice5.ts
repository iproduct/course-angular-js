'use strict';

import * as angular from 'angular';
import {CurrencyConverter} from './finance3';
import './finance3';

angular.module('invoice5', ['finance3', 'dialogs'])
  .controller('InvoiceController', ['currencyConverter', function (currencyConverter: CurrencyConverter): void {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = currencyConverter.currencies;
    this.newCurrency = '';
    this.username = 'Trayan';
    this.showPaymentDialog = false;

    this.total = function total(outCurr: string) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay(): void {
      this.showPaymentDialog = true;
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


