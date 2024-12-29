import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAptData1735224498985 implements MigrationInterface {
    // A class implementing the `MigrationInterface`
    public async up(queryRunner: QueryRunner): Promise<void> {
        // The `up` method defines the changes to apply to the database when the migration is executed.
        
        await queryRunner.query(`
            INSERT INTO "apartment" ("name", "unitNumber", "project", "price")
            VALUES
            ('Apartment 1', '101', 'Project A', 1000),
            ('Apartment 2', '102', 'Project B', 1200),
            ('Apartment 3', '103', 'Project C', 1500);
    `)
        // Inserts three rows into the `apartment` table with predefined data:
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // The `down` method defines the reverse operation to remove changes made by the `up` method.

        await queryRunner.query(`DELETE FROM "apartment" WHERE "unitNumber" IN ('101', '102', '103');`)
    }

}
