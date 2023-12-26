// cart.ts
import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	Column,
	CreateDateColumn,
} from "typeorm";
import { Customer } from "./Customer";
import { Product } from "./Product";

@Entity({ name: "carts" })
export class Cart {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.carts)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@ManyToOne(() => Product, (product) => product.carts)
	@JoinColumn({ name: "product_id" })
	product: Product;

	@Column()
	quantity: number;

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
