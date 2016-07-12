'use strict';

import '../products';
import './product.service';
import { ProductResourceClass } from '../models/products.model';

describe('ProductService', function(): void {
  let $httpBackend: ng.IHttpBackendService;
  let productResourceClass: ProductResourceClass;
  let productsData = [
    {name: 'Phone X'},
    {name: 'Phone Y'},
    {name: 'Phone Z'}
  ];

  // Add a custom equality tester before each test
  beforeEach(function(): void {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  // Load the module that contains the `Phone` service before each test
  beforeEach(angular.mock.module('productsModule'));

  // Instantiate the service and "train" `$httpBackend` before each test
  beforeEach(inject(function(_$httpBackend_: ng.IHttpBackendService, _ProductResourceClass_: ProductResourceClass): void {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/products/products.json').respond(productsData);

    productResourceClass = _ProductResourceClass_;
  }));

  // Verify that there are no outstanding expectations or requests after each test
  afterEach(function (): void {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch the phones data from `/api/products/products.json`', function(): void {
    let products = productResourceClass.query();

    expect(products).toEqual([]);

    $httpBackend.flush();
    expect(products).toEqual(productsData);
  });

});
