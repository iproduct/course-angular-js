import {ModuleRegistry} from "./commons/modules/module.registry";

import {commonsModule} from "./commons/commons";
import {homeModule} from "./home/home";
// import {helloSimpleModule} from "./commons/directives/hello-simple.directive";

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(commonsModule);
moduleRegistry.registerModule(homeModule);
// moduleRegistry.registerModule(helloSimpleModule);

exports.moduleRegistry = moduleRegistry;
