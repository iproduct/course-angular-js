'use strict';

import IStateService = angular.ui.IStateService;
import ILogService = angular.ILogService;

import {AbstractController} from '../commons/controllers/abstract.controller';

interface Food {
    'name': string;
    'spiciness': string;
}

export class FoodController extends AbstractController {
    customSpice: string = 'wasabi';
    spice: string = 'habanero';
    spices: Food[] = [{ 'name': 'pasilla', 'spiciness': 'mild' },
        { 'name': 'jalapeno', 'spiciness': 'hot hot hot!' },
        { 'name': 'habanero', 'spiciness': 'LAVA HOT!!' }];

    public static $inject: Array<string> = ['$log', '$state'];

    public constructor(logger: ILogService, $state: IStateService) {
        super(logger, $state);
        logger.debug('Food controller loaded...');
    }

    spicy(spice: string): void {
        this.spice = spice;
    };
}
