'use strict';

import { productsModule } from '../products';

productsModule.
  filter('fraction', ['$filter', ($filter: ng.IFilterService) =>  {
    return function(input: number): string {
      console.log(input);
      let result: string = $filter('currency')(input, 'EUR', 2);
      console.log(result);
      result = result.replace(/(00)$/, '--');
      console.log(result);
      return result;
    };
  }]);
