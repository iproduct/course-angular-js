export interface Product {
    'id': number;
    'name': string;
    'vendor'?: string;
    'permalink': string;
    'imageUrl'?: string;
    'snippet': string;
    'price'?: number;
    'currency'?: string;
}

export interface ProductResource extends ng.resource.IResource<Product>, Product {
}

export interface ProductResourceClass extends ng.resource.IResourceClass<ProductResource> {
    query(): ng.resource.IResourceArray<ProductResource>;
}

