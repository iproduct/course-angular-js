"use strict";

import {homeModule} from "../../home";
import {ModalController} from "./modal.controller";

// Pre-loading the html templates into the Angular's $templateCache
let templateModalUrl: any = require("./modal.template.html");

homeModule.directive("modal", function () : ng.IDirective{
    return {
        controller: ModalController,
        controllerAs: "vm",
        replace: true, // Replace with template
        restrict: "E",
        scope: {
            show: "="
        },
        templateUrl: templateModalUrl,
        transclude: true, // To use custom content
        link: function (scope: any, element: Element, attrs: any) : void {
            scope.windowStyle = {};
            if (attrs.width) {
                scope.windowStyle.width = attrs.width;
            }
            if (attrs.height) {
                scope.windowStyle.height = attrs.height;
            }
            scope.hideModal = function () : void {
                scope.show = false;
            };
        }
    };
});
