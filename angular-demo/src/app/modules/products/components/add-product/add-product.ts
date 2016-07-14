'use strict';

import '../modal/modal';
import { productsModule } from '../../products';
import { AddProductController } from './add-product.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateAddProductUrl:any = require('./add-product.template.html');

productsModule
  .component('addProduct', {
    controller: AddProductController,
    controllerAs: '$ctrl',
    templateUrl: templateAddProductUrl,
    bindings: {
      modalShown: '=show'
    }
  });
