import { MigrationInterface, QueryRunner } from "typeorm";

export class fixMtCoisa1653583704619 implements MigrationInterface {
    name = 'fixMtCoisa1653583704619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_714ea4e3bc57f21a9e5fa9540cb"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "cartsId" TO "cartId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_714ea4e3bc57f21a9e5fa9540cb" TO "UQ_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_342497b574edb2309ec8c6b62aa" TO "UQ_714ea4e3bc57f21a9e5fa9540cb"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "cartId" TO "cartsId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_714ea4e3bc57f21a9e5fa9540cb" FOREIGN KEY ("cartsId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
