import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
} from "typeorm";
import { Product } from "./Product";
@Entity({ name: "brands" })
export class Brand {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	brand_name: string;

	@OneToMany(() => Product, (product) => product.brand)
	products: Product[];

	@CreateDateColumn({ type: "timestamp with time zone" })
	created_at: Date;
}
