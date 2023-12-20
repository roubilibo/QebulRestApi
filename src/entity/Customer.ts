import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
} from "typeorm";
import { Product } from "./Product";
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

	@Column()
	created_at: Date;
}
