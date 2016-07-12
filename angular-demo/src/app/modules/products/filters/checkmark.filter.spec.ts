'use strict';

import '../products';
import './checkmark.filter';

describe('checkmark.filter', function(): void {

  beforeEach(angular.mock.module('productsModule'));

  it('should convert boolean values to unicode checkmark or cross',
     inject(function(checkmarkFilter: (bval: boolean) => string): void {
        expect(checkmarkFilter(true)).toBe('\u2713');
        expect(checkmarkFilter(false)).toBe('\u2718');
     })
  );

});
