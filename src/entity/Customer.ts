import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	CreateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { Address } from "./Address";
import { Cart } from "./Cart";
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

	@Column({ nullable: true })
	profile_picture: string;

	@OneToMany(() => Transaction, (transaction) => transaction.customer)
	transactions: Transaction[];

	@OneToMany(() => Address, (address) => address.customer)
	addresses: Address[];

	@OneToMany(() => Cart, (cart) => cart.customer) // New relationship
	carts: Cart[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
