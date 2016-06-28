'use strict';

import { ProductResourceClass } from '../models/products.model';
import { productsModule } from '../products';

// Define the `productServiceModule` module
productsModule
  .factory('ProductResourceClass', ['$resource',
    function ($resource: ng.resource.IResourceService): ProductResourceClass {
      return <ProductResourceClass> $resource('/api/products/:productId.json', {}, {
        query: {
          method: 'GET',
          params: { productId: 'products' },
          isArray: true
        }
      });
    }
  ]);
