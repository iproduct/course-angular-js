import * as angular from 'angular';
import './invoice5';
import './simple-dialog.directive';


/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */

angular.module('invoice1', [])
.controller('InvoiceController', function() {
this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = ['USD', 'EUR', 'CNY'];
  this.usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };

  this.total = function total(outCurr: string) {
    return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.convertCurrency = function convertCurrency(amount: number, inCurr: string , outCurr: string) {
    return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };
});
