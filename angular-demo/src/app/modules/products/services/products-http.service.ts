'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;
import { Product, ProductResourceClass } from '../models/products.model';
import { productsModule } from '../products';

import {AbstractController} from '../../commons/controllers/abstract.controller';

export class ProductsHttpService extends AbstractController {
  serviceUrl: string;

  // necessary to help AngularJS know about what to inject and in which order
  static $inject: Array<string> = ['$log', '$state', '$http'];

  public constructor(logger: ILogService, $state: IStateService, private $http: ng.IHttpService) {
    super(logger, $state);
    this.serviceUrl = '/api/products';
    logger.debug('ProductsHttpService constructed ...');
  }

  getProducts(): Promise<Product[]> {
    return this.$http({
      method: 'GET',
      url: this.serviceUrl
    }).then((response: {data: Product[]}) => response.data);
  }

  addProduct(product: Product): Promise<Product> {
    return this.$http({
      method: 'POST',
      url: this.serviceUrl,
      data: JSON.stringify(product)
    });
  }
}

// Define the `productServiceModule` module
productsModule.service('ProductsHttpService', ProductsHttpService);
