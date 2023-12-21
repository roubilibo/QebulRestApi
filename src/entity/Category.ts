import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { Product } from "./Product";
@Entity({ name: "categories" })
export class Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	category_name: string;

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
