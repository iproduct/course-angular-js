'use strict';
import * as angular from 'angular';
import './capitalizer';
import {BetterAppController as AppController} from './better-app.controller';
import {onEnter} from './on-enter.directive';
// import {ICapitalizerService} from './capitalizer';

angular.module('myApp', ['capitalizer'])
  .value('interests', ['JAVA', 'ANGULAR', 'NODE', 'HAPI'])
  .controller('AppController', AppController)
  .directive('onEnter', onEnter);



  // .controller('MyAppController', ['CapitalizerService', function (capitalizerService: ICapitalizerService): void {
  //   this.name = 'Trayan';
  //   this.interests = ['JAVA', 'AANGULAR', 'NODE', "HAPI"];
  //   this.newInterest = '';
  //   this.addInterest = () => {
  //     if(this.interests.indexOf(this.newInterest) === -1) {
  //       this.interests.push(
  //         capitalizerService.capitalize(this.newInterest));
  //       this.newInterest = '';
  //     }
  //   };
  // }])
  // .run(($rootScope: ng.IRootScopeService) => {
  //   (<any>$rootScope).name = 'Trayan';
  //   (<any>$rootScope).interests = ['Java', 'Angular', 'Node', "hapi"];
  // });




