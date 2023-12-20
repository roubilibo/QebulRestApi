import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "admin" })
export class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	created_at: Date;
}
