import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";



@Entity('product')

export class Product {

    @PrimaryGeneratedColumn()

    id:number;



    @Column({length: 255})

    name:string;



    @Column({ type: 'varchar', length: 100, nullable: true })

    category: string | null;



    @Column({ type: 'decimal', precision: 10, scale: 2 })

    price: number;



    @Column()

    stock_quantity: number;

}

