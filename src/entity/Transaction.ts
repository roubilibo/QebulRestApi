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

@Entity({ name: "transactions" })
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.transactions, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@ManyToOne(() => Product, (product) => product.transactions, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "product_id" })
	product: Product;

	@Column()
	quantity: number;

	@Column()
	total_price: number;

	@Column()
	status: string;

	@CreateDateColumn({ type: "timestamp" })
	created_at: Date;
}
