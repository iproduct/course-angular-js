'use strict';
import '../../products';
import { ProductListController } from './product-list.controller';

describe('productList ', () => {

  // Load the module that contains the `productsModule` component before each test
  beforeEach(angular.mock.module('productsModule'));

  // Test the controller
  describe('ProductListController', () => {
    let $httpBackend: ng.IHttpBackendService;
    let ctrl: ProductListController;

    beforeEach(inject(function($componentController: ng.IComponentControllerService, _$httpBackend_: ng.IHttpBackendService): void {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/api/products')
                  .respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      ctrl = <ProductListController>$componentController('productList', undefined);
    }));

    it('should create a `products` property with 2 products fetched with `$http`', () => {
      jasmine.addCustomEqualityTester(angular.equals);

      expect(ctrl.products).toEqual([]);

      $httpBackend.flush();
      expect(ctrl.products).toEqual([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });

    it('should set a default value for the `orderProp` property', () => {
      expect(ctrl.orderProp).toBe('id');
    });

  });

});
