'use strict';

// import IModule = angular.IModule;
import '../commons';

describe('Unit testing helloSimple directive', () => {
  let $compile: ng.ICompileService ,
      $rootScope: ng.IRootScopeService;

  // Load the myApp module, which contains the directive
  beforeEach(angular.mock.module('commonsModule'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject( (_$compile_: ng.ICompileService, _$rootScope_: ng.IRootScopeService) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', () => {
    // Compile a piece of HTML containing the directive
    let element = $compile('<hello-simple></hello-simple>')($rootScope);
    // fire all the watches, so the scope expression {{1 + 2}} will be evaluated
    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain('Hello Simple Directive 3');
  });
});
