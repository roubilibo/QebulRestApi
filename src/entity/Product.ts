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
import { Transaction } from "./Transaction";
import { Brand } from "./Brand";
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

	@ManyToOne(() => Brand, (brand) => brand.products, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "brand_id" })
	brand: Brand;

	@ManyToMany(() => Customer, (customer) => customer.products)
	@JoinTable({
		name: "carts",
		joinColumn: { name: "product_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "customer_id", referencedColumnName: "id" },
	})
	customers: Customer[];

	@OneToMany(() => Transaction, (transaction) => transaction.product)
	transactions: Transaction[];

	@Column()
	product_name: string;

	@Column()
	product_image: string;

	@Column()
	product_description: string;

	@Column()
	product_price: number;

	@Column()
	product_quantity: number;
	
	@CreateDateColumn({ type: "timestamp" })
	created_at: Date;
}
