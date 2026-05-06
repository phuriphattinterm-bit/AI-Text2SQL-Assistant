import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(product: Product): Promise<Product>;
    update(id: number, product: Product): Promise<Product>;
    remove(id: number): Promise<void>;
}
