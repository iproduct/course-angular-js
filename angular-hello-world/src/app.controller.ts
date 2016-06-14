'use strict';
import {ICapitalizerService} from './capitalizer.service';

export class AppController {
    name: string = 'Trayan';
    // interests: string[] = ['JAVA', 'AANGULAR', 'NODE', 'HAPI'];
    newInterest: string = '';

    constructor(public interests: string[], protected capitalizerService: ICapitalizerService) { }

    addInterest(): void {
        if (this.interests.indexOf(this.newInterest) === -1) {
            this.interests.push(
                this.capitalizerService.capitalize(this.newInterest));
            this.newInterest = '';
        }
    }
}

AppController.$inject = ['interests', 'CapitalizerService'];

