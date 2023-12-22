import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	CreateDateColumn,
} from "typeorm";
import { Product } from "./Product";
import { Transaction } from "./Transaction";
import { Address } from "./Address";
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

	@OneToMany(() => Address, (address) => address.customer)
	addresses: Address[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
