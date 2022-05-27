import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDvdModel1653577452286 implements MigrationInterface {
    name = 'fixDvdModel1653577452286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_6731d37a00dd70f61e7d6d0aceb"`);
        await queryRunner.query(`ALTER TABLE "dvd" RENAME COLUMN "dvdId" TO "stockId"`);
        await queryRunner.query(`ALTER TABLE "dvd" RENAME CONSTRAINT "REL_6731d37a00dd70f61e7d6d0ace" TO "UQ_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_a68c996998e86e22dc2580918c3" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_a68c996998e86e22dc2580918c3"`);
        await queryRunner.query(`ALTER TABLE "dvd" RENAME CONSTRAINT "UQ_a68c996998e86e22dc2580918c3" TO "REL_6731d37a00dd70f61e7d6d0ace"`);
        await queryRunner.query(`ALTER TABLE "dvd" RENAME COLUMN "stockId" TO "dvdId"`);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_6731d37a00dd70f61e7d6d0aceb" FOREIGN KEY ("dvdId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
