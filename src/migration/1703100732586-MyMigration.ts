import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703100732586 implements MigrationInterface {
    name = 'MyMigration1703100732586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carts" ("product_id" integer NOT NULL, "customer_id" integer NOT NULL, CONSTRAINT "PK_19c7d45a8e2940c24f0e2236f74" PRIMARY KEY ("product_id", "customer_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7d0e145ebd287c1565f15114a1" ON "carts" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a9dade7a4baafc128f8e0d804" ON "carts" ("customer_id") `);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_7d0e145ebd287c1565f15114a18" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_5a9dade7a4baafc128f8e0d8041" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_5a9dade7a4baafc128f8e0d8041"`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_7d0e145ebd287c1565f15114a18"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a9dade7a4baafc128f8e0d804"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d0e145ebd287c1565f15114a1"`);
        await queryRunner.query(`DROP TABLE "carts"`);
    }

}
