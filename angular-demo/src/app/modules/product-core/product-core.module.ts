'use strict';

import './product/product.module';
import './product/product.service';
// export * from './product/product.module';

// Define the `product-core` module
export const productCoreModule = angular.module('productCoreModule', ['commonsModule', 'productModule']);
