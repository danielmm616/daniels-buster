import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1653572913774 implements MigrationInterface {
    name = 'createTables1653572913774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvd" ("id" uuid NOT NULL, "name" character varying NOT NULL, "duration" character varying NOT NULL, "dvdId" uuid, CONSTRAINT "REL_6731d37a00dd70f61e7d6d0ace" UNIQUE ("dvdId"), CONSTRAINT "PK_1a7f37c43aab7c9a335ee666451" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_dvds_dvd" ("cartId" uuid NOT NULL, "dvdId" uuid NOT NULL, CONSTRAINT "PK_f600830824ddbc39d110580f273" PRIMARY KEY ("cartId", "dvdId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e4439dbcdc1e1b8da68d5ff076" ON "cart_dvds_dvd" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_16dab9777b8de9e32efdd6a9a0" ON "cart_dvds_dvd" ("dvdId") `);
        await queryRunner.query(`ALTER TABLE "dvd" ADD CONSTRAINT "FK_6731d37a00dd70f61e7d6d0aceb" FOREIGN KEY ("dvdId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvd" ADD CONSTRAINT "FK_e4439dbcdc1e1b8da68d5ff0762" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvd" ADD CONSTRAINT "FK_16dab9777b8de9e32efdd6a9a0d" FOREIGN KEY ("dvdId") REFERENCES "dvd"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvd" DROP CONSTRAINT "FK_16dab9777b8de9e32efdd6a9a0d"`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvd" DROP CONSTRAINT "FK_e4439dbcdc1e1b8da68d5ff0762"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "dvd" DROP CONSTRAINT "FK_6731d37a00dd70f61e7d6d0aceb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16dab9777b8de9e32efdd6a9a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4439dbcdc1e1b8da68d5ff076"`);
        await queryRunner.query(`DROP TABLE "cart_dvds_dvd"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "dvd"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
