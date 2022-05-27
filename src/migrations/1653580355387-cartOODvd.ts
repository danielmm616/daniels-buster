import { MigrationInterface, QueryRunner } from "typeorm";

export class cartOODvd1653580355387 implements MigrationInterface {
    name = 'cartOODvd1653580355387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "dvdId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "UQ_9ed71a7c7e8e5e85c857bf79682"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dvdId"`);
    }

}
