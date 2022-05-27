import { MigrationInterface, QueryRunner } from "typeorm";

export class fixCartMMDvd1653581775117 implements MigrationInterface {
    name = 'fixCartMMDvd1653581775117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dvdId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "cartsId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_714ea4e3bc57f21a9e5fa9540cb" UNIQUE ("cartsId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_714ea4e3bc57f21a9e5fa9540cb" FOREIGN KEY ("cartsId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_714ea4e3bc57f21a9e5fa9540cb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_714ea4e3bc57f21a9e5fa9540cb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cartsId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
