"use strict";

// import IModule = angular.IModule;
import {commonsModule} from "../commons";
import IDirective = angular.IDirective;

// export const helloSimpleModule: IModule = angular.module("helloSimpleModule", [])
commonsModule.directive("helloSimple", function (): IDirective {
    console.log("!!!  Registering helloSimpleDirective ...");
    return {
        replace: true,
        restrict: "E", // An Element Directive.
        scope: true, // inherits child scope from parent.
        template: "<h3>Hello Simple Directive</h3>"
    };
});

