import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAptData1735224498985 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO "apartment" ("name", "unitNumber", "project", "price")
      VALUES
        ('Apartment 1', '101', 'Project A', 1000),
        ('Apartment 2', '102', 'Project B', 1200),
        ('Apartment 3', '103', 'Project C', 1500);
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "apartment" WHERE "unitNumber" IN ('101', '102', '103');`)
    }

}
