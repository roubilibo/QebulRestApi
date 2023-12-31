import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { Transaction } from "./Transaction";
import { Brand } from "./Brand";
import { Cart } from "./Cart";
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

	@OneToMany(() => Cart, (cart) => cart.product) // New relationship
	carts: Cart[];

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

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
