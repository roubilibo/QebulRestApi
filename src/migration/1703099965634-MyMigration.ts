import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703099965634 implements MigrationInterface {
	name = "MyMigration1703099965634";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "products" ("id" SERIAL NOT NULL,"category_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"), "product_name" character varying NOT NULL, "product_image" character varying NOT NULL, "product_description" character varying NOT NULL, "product_price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now())`
		);
		await queryRunner.query(
			`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "category_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`
		);
		await queryRunner.query(`DROP TABLE "categories"`);
		await queryRunner.query(`DROP TABLE "products"`);
		await queryRunner.query(`DROP TABLE "customers"`);
		await queryRunner.query(`DROP TABLE "admin"`);
	}
}
