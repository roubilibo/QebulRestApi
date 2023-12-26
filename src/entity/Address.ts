// Address.ts
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
} from "typeorm";
import { Customer } from "./Customer";

@Entity({ name: "addresses" })
export class Address {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.addresses)
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@Column()
	address: string;

	@Column()
	city: string;

	@Column()
	province: string;

	@Column()
	pos_code: number;

	@CreateDateColumn({type: "timestamp with time zone"})
	created_at: Date;
}
