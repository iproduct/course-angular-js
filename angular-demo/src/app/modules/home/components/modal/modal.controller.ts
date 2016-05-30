"use strict";

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from "../../../commons/controllers/abstract.controller";

export class ModalController extends AbstractController {
    public modalShown: boolean = false;
    public static $inject: Array<string> = ["$log", "$state"];

    public toggleModal(): void {
        this.modalShown = !this.modalShown;
    };

    // necessary to help AngularJS know about what to inject and in which order

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        logger.debug("Modal component loaded");
    }

}
