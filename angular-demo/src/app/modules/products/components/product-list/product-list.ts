'use strict';

import { productsModule } from '../../products';
import { ProductListController } from './product-list.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateProductListUrl:any = require('./product-list.template.html');

productsModule
  .component('productList', {
    controller: ProductListController,
    controllerAs: '$ctrl',
    templateUrl: templateProductListUrl
  });
