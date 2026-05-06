import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from './product.entity';



@Injectable()

export class ProductsService {



    constructor(

        @InjectRepository(Product)

        private productsRepository: Repository<Product>

    ) {}



    async findAll(): Promise<Product[]> {

        return await this.productsRepository.find();

    }



    async findOne(id: number): Promise<Product> {

        const product = await this.productsRepository.findOneBy({id});



        if (!product) {

            throw new NotFoundException("Said product doesn't existed");

        }



        return product;

    }



    async create(product: Product): Promise<Product> {

        return await this.productsRepository.save(product);

    }



    async update(id: number, product: Product): Promise<Product> {

        const existingProduct = await this.productsRepository.findOneBy({id});



        if (!existingProduct) {

            throw new NotFoundException("Said product doesn't existed");

        }



        await this.productsRepository.update(id, product)

        const updatedProduct = await this.productsRepository.findOneBy({id});

        if (!updatedProduct) {

            throw new NotFoundException("Said product doesn't existed");

        }

        return updatedProduct;

    }



    async remove(id: number): Promise<void> {

        const existingProduct = await this.productsRepository.findOneBy({id});



        if(!existingProduct) {

            throw new NotFoundException("Said product doesn't existed");

        }



        await this.productsRepository.delete(id)

    }

}

