import {ModuleRegistry} from './commons/modules/module.registry';

import {commonsModule} from './commons/commons';
import {homeModule} from './home/home';
import {demo01Module} from './demo01/demo01';
import {productsModule} from './products/products';
// import {productListModule} from './product-list/product-list.module';
// import {productModule} from './product-core/product/product.module';
// import {productCoreModule} from './product-core/product-core.module';

const moduleRegistry:ModuleRegistry = new ModuleRegistry();

// Register all your modules below
moduleRegistry.registerModule(commonsModule);
moduleRegistry.registerModule(homeModule);
moduleRegistry.registerModule(demo01Module);
moduleRegistry.registerModule(productsModule);
// moduleRegistry.registerModule(productModule);
// moduleRegistry.registerModule(productCoreModule);
// moduleRegistry.registerModule(productListModule);

exports.moduleRegistry = moduleRegistry;
