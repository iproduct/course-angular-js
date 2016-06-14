'use strict';
import {ICapitalizerService} from './capitalizer.service';
import {AppController} from './app.controller';

export class BetterAppController extends AppController {

    constructor(public interests: string[], capitalizerService: ICapitalizerService) {
        super(interests, capitalizerService);
     }

    addInterest(): void {
        if (this.interests.indexOf(this.newInterest) === -1) {
            this.interests.push('NEW: '
                + this.capitalizerService.capitalize(this.newInterest));
            this.newInterest = '';
        }
    }
}

BetterAppController.$inject = ['interests', 'CapitalizerService'];

