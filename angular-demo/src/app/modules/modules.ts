import {ModuleRegistry} from './commons/modules/module.registry';

import {commonsModule} from './commons/commons';
import {homeModule} from './home/home';
import {foodModule} from './food/food';
import {productsModule} from './products/products';
import {tabsModule} from './tabs/tabs';

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(commonsModule);
moduleRegistry.registerModule(homeModule);
moduleRegistry.registerModule(foodModule);
moduleRegistry.registerModule(productsModule);
moduleRegistry.registerModule(tabsModule);

exports.moduleRegistry = moduleRegistry;
