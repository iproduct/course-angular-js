import {FoodController} from './food.controller';
import './demo01';

describe('FoodController function', function (): void {

  describe('FoodController', function (): void {
    let vm: FoodController;

    beforeEach(angular.mock.module('demo01Module'));

    beforeEach(angular.mock.inject(function ($rootScope: ng.IScope, $controller: ng.IControllerService,
                                             $log: ng.ILogService, $state: ng.ui.IState): void {
      vm = <FoodController> $controller('FoodController', { $log: $log,  $state: $state});
    }));

    it('should create "spices" model with 3 spices', function (): void {
      expect(vm.spices.length).toBe(3);
    });

    it('should set the default value of spice', function (): void {
      expect(vm.spice).toBe('habanero');
    });

    it('should update spice when spicy() is called', function (): void {
      vm.spicy('mustard');
      expect(vm.spice).toBe('mustard');
    });

  });
});
