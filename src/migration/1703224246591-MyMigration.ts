import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703224246591 implements MigrationInterface {
	name = "MyMigration1703224246591";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "user_id" integer, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"), "address" character varying NOT NULL, "city" character varying NOT NULL, "province" character varying NOT NULL, "pos_code" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
		);
		await queryRunner.query(
			`ALTER TABLE "addresses" ADD CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023" FOREIGN KEY ("user_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "addresses" DROP CONSTRAINT "FK_16aac8a9f6f9c1dd6bcb75ec023"`
		);
		await queryRunner.query(`DROP TABLE "addresses"`);
	}
}
