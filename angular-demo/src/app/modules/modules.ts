import {ModuleRegistry} from './commons/modules/module.registry';

import {commonsModule} from './commons/commons';
import {homeModule} from './home/home';
import {demo01Module} from './demo01/demo01';

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(commonsModule);
moduleRegistry.registerModule(homeModule);
moduleRegistry.registerModule(demo01Module);

exports.moduleRegistry = moduleRegistry;
