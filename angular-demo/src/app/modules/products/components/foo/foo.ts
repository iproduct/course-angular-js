'use strict';

import {productsModule} from '../../products';
import {FooController} from './foo.controller';

// Pre-loading the html templates into the Angular's $templateCache
let templateFooUrl:any = require('./foo.template.html');

productsModule.component('foo2', {
    controller: FooController,
    controllerAs: 'vm',
    templateUrl: templateFooUrl,
});
