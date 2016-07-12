'use strict';

import { productsModule } from '../products';

productsModule.
  filter('checkmark', function(): (bval: boolean) => string {
    return function(input: boolean): string {
      return input ? '\u2713' : '\u2718';
    };
  });
