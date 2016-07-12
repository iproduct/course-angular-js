'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import '../products';
import { Product } from '../models/products.model';
import { ProductsHttpService } from './products-http.service';

describe('ProductsHttpService class', () => {
  let $httpBackend: ng.IHttpBackendService;
  let productsHttpService: ProductsHttpService;
  let productsData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'},
    {name: 'Phone W'}
  ];

  beforeEach(() => {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  beforeEach(angular.mock.module('productsModule'));

  beforeEach(inject(
    (_$httpBackend_: ng.IHttpBackendService,
    _ProductsHttpService_: ProductsHttpService) => {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/products').respond(productsData);
      productsHttpService = _ProductsHttpService_;
  }));

  it('should fetch the phones from `/api/products`', () => {
    let products = productsHttpService.getProducts();
    let resolvedValue: any;
    
    products.then((value: any) => { resolvedValue = value; });
    expect(resolvedValue).toBeUndefined();
    
    $httpBackend.flush();
    expect(resolvedValue).toEqual(productsData);
  });

});



