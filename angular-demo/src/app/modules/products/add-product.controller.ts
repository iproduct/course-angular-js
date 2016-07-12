'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;
import { Product } from './models/products.model';
import { ProductsHttpService } from './services/products-http.service';
import { AbstractController } from '../commons/controllers/abstract.controller';

export class AddProductController extends AbstractController {
  modalShown: boolean = false;
  productMaster: Product = {
    'id': 0,
    'name': '',
    // 'vendor': '',
    'permalink': '',
    // 'imageUrl': '',
    'snippet': '',
    // 'price': 0,
    'currency': 'USD'
  };
  product: Product;
  productForm: ng.IFormController;
  currencies: string[] = ['USD', 'EUR', 'CNY', 'GBP', 'BGN'];

  // necessary to help AngularJS know about what to inject and in which order
  static $inject: Array<string> = ['$log', '$state', 'ProductsHttpService'];

  public constructor(logger: ILogService, $state: IStateService, private productsHttpService: ProductsHttpService) {
    super(logger, $state);
    this.reset(undefined);
    logger.debug('AddProductController loaded ...');
  }

  toggleModal(): void {
    this.modalShown = !this.modalShown;
  };

  update(): void {
    this.productMaster = angular.copy(this.product);
    this.productsHttpService.addProduct(this.product)
      .then( (result: Product) => this.logger.info(result) );
  };

  reset(productForm: ng.IFormController): void {
    if (productForm !== undefined) {
      productForm.$rollbackViewValue();
      // productForm.$setUntouched();
    }
    this.product = angular.copy(this.productMaster);
  };

  getItemState(item: ng.INgModelController): string {
    let state = '';
    if (item.$pristine) {
      state += 'pristine, ';
    }
    if (item.$touched) {
      state += 'touched, ';
    }
    if (item.$dirty) {
      state += 'dirty, ';
    }
    if (item.$valid) {
      state += 'valid';
    }
    if (item.$invalid) {
      state += 'invalid';
    }
    return state;
  }
}
