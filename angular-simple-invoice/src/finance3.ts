import * as angular from 'angular';

export interface CurrencyConverter {
    currencies: Array<string>;
    convert: CurrencyConverterFunction;
    refresh: () => Promise<void>;
}

interface CurrencyConverterFunction {
    (amount: number, inCurr: string, outCurr: string): number;
}

interface CurrencyRates {
    [cirrencyName: string]: number;
}

interface YahooFinanceForeignRate {
    id: string;
    Rate: string;
}

interface YahooFinanceForeignRatesResult {
    query: {
        results: {
            rate: YahooFinanceForeignRate[];
        }
    };
}
angular.module('finance3', [])
    .factory('currencyConverter', ['$http', function ($http: ng.IHttpService): CurrencyConverter {
        const YAHOO_FINANCE_URL_PATTERN =
            '//query.yahooapis.com/v1/public/yql?q=select * from ' +
            'yahoo.finance.xchange where pair in ("PAIRS")&format=json&' +
            'env=store://datatables.org/alltableswithkeys&callback=JSON_CALLBACK';
        let currencies: string[] = ['USD', 'EUR', 'CNY', 'GBP', 'BGN'];
        let usdToForeignRates: CurrencyRates = {};

        let convert: CurrencyConverterFunction = function (amount, inCurr, outCurr) {
            return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
        };

        let refresh = function (): Promise<void> {
            const url = YAHOO_FINANCE_URL_PATTERN.
                replace('PAIRS', 'USD' + currencies.join('","USD'));
            return $http.jsonp(url).then((response: ng.IHttpPromiseCallbackArg<{}>) => {
                let newUsdToForeignRates: CurrencyRates = {};
                angular.forEach(
                    (<YahooFinanceForeignRatesResult>response.data).query.results.rate,
                    (rate: YahooFinanceForeignRate) => {
                        let currency: string = rate.id.substring(3, 6);
                        newUsdToForeignRates[currency] = parseFloat(rate.Rate);
                    }
                );
                usdToForeignRates = newUsdToForeignRates;
            });
        };

        refresh();

        return {
            convert: convert,
            currencies: currencies,
            refresh: refresh
        };
    }]);