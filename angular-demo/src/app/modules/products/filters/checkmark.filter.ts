'use strict';

import '../product-core.module';

angular.
  module('productCoreModule').
  filter('checkmark', function(): (bval: boolean) => string {
    return function(input: boolean): string {
      return input ? '\u2713' : '\u2718';
    };
  });
