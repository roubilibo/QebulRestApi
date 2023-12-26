import "reflect-metadata";
import { DataSource } from "typeorm";
import Env from "./utils/env/Env";
import { Admin } from "./entity/Admin";
import { Customer } from "./entity/Customer";
import { Product } from "./entity/Product";
import { Transaction } from "./entity/Transaction";
import { Brand } from "./entity/Brand";
import { Category } from "./entity/Category";
import { Address } from "./entity/Address";
import { Cart } from "./entity/Cart";
export const AppDataSource = new DataSource({
	type: "postgres",
	host: Env.DB_HOST,
	port: Env.DB_PORT,
	username: Env.DB_USER,
	password: Env.DB_PASSWORD,
	database: Env.DB_NAME,
	synchronize: true,
	logging: false,
	entities: ["src/entity/*.ts"],
	migrations: ["src/migration/*.ts"],
	subscribers: [],
	ssl: true,
});
