import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1780296217299 implements MigrationInterface {
    name = 'Init1780296217299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, CONSTRAINT "UQ_8ef722e770798e37b3205370bfd" UNIQUE ("slug"), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cinemas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cityId" integer, CONSTRAINT "PK_5c49a5f87710ce93fad49d72320" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "startTime" TIMESTAMP NOT NULL, "price" integer NOT NULL, "movieId" integer, "cinemaId" integer, "hallId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "hall" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cinemaId" integer, CONSTRAINT "PK_4b7ec43f24e82084474569abec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "row" integer NOT NULL, "number" integer NOT NULL, "hallId" integer, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "sessionId" integer, "seatId" integer, "orderId" integer, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "totalPrice" integer NOT NULL, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "phone_number" character varying NOT NULL, "telegram_id" character varying, "role" character varying NOT NULL DEFAULT 'USER', CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cinemas" ADD CONSTRAINT "FK_db7c566dde76f65976d7214344b" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_f056a463749c7b7b6700511bed7" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_1b10bda50b4ba188fb1c8f5cfdf" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_9af3916ca4424685ada4c823a39" FOREIGN KEY ("hallId") REFERENCES "hall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "hall" ADD CONSTRAINT "FK_d7086dfd41846af99c117ff018a" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_f3263103c864c646c34ce3406cf" FOREIGN KEY ("hallId") REFERENCES "hall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_f899125e17b829a124a3d66e4a6" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_ab9b02f72bbc7d05bd15a5cb6b4" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD CONSTRAINT "FK_8f4c2f0a2877e526e8881b51464" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_8f4c2f0a2877e526e8881b51464"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_ab9b02f72bbc7d05bd15a5cb6b4"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP CONSTRAINT "FK_f899125e17b829a124a3d66e4a6"`);
        await queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_f3263103c864c646c34ce3406cf"`);
        await queryRunner.query(`ALTER TABLE "hall" DROP CONSTRAINT "FK_d7086dfd41846af99c117ff018a"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_9af3916ca4424685ada4c823a39"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_1b10bda50b4ba188fb1c8f5cfdf"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_f056a463749c7b7b6700511bed7"`);
        await queryRunner.query(`ALTER TABLE "cinemas" DROP CONSTRAINT "FK_db7c566dde76f65976d7214344b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "seat"`);
        await queryRunner.query(`DROP TABLE "hall"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TABLE "cinemas"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
