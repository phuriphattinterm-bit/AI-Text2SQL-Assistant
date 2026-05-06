import { ProductsService } from './products.service';
import { Product } from './product.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(product: Product): Promise<Product>;
    update(id: string, product: Product): Promise<Product>;
    delete(id: string): Promise<void>;
}
