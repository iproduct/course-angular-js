import * as angular from 'angular';

angular.module('myApp', [])
.controller('AppController', function($log: ng.ILogService):void {
    this.name = 'Trayan';
    this.interests = ['Angular', 'RxJS', 'Java', 'Robots'];
})
.run(function ($rootScope: ng.IScope):void {
  (<any>$rootScope).name = 'Trayan';
});