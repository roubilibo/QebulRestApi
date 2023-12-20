import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
} from "typeorm";
import { Product } from "./Product";
import { Transaction } from "./Transaction";
@Entity({ name: "customers" })
export class Customer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	profile_picture: string;

	@ManyToMany(() => Product, (product) => product.customers)
	products: Product[];

	@OneToMany(() => Transaction, (transaction) => transaction.customer)
	transactions: Transaction[];

	@Column()
	created_at: Date;
}
