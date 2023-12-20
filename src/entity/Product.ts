import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
	JoinTable,
	ManyToMany,
} from "typeorm";
import { Category } from "./Category";
import { Customer } from "./Customer";
@Entity({ name: "products" })
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Category, (category) => category.products, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "category_id" })
	category: Category;

	@ManyToMany(() => Customer, (customer) => customer.products)
	@JoinTable({
		name: "carts",
		joinColumn: { name: "product_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "customer_id", referencedColumnName: "id" },
	})
	customers: Customer[];
	@Column()
	product_name: string;

	@Column()
	product_image: string;

	@Column()
	product_description: string;

	@Column()
	product_price: number;

	@CreateDateColumn({ type: "timestamp" })
	created_at: Date;
}
