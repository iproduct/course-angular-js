'use strict';

import {demo01Module} from '../../demo01';
import {FooController} from './foo.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateFooUrl:any = require('./foo.template.html');

demo01Module.component('foo2', {
    controller: FooController,
    controllerAs: 'vm',
    templateUrl: templateFooUrl,
});
