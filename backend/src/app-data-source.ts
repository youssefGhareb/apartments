import { Apartment } from "./entities/Apartement";
import { DataSource } from "typeorm";
import { InsertAptData1735224498985 } from "./migrations/1735224498985-insertAptData";

// Initialize TypeORM connection
const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "apts-admin",
    password: "FakePwd13#",
    database: "apartments",
    synchronize: true, // Automatically syncs the database schema with the entities on application startup.
    logging: true,
    entities: [Apartment],  // Specifies the entities (tables) to be managed by TypeORM. 
                            // The `Apartment` entity maps to the `apartments` table in the database.
    migrations: [InsertAptData1735224498985],   // Lists the migration files to be used for managing the database schema and data changes.
                                                // `InsertAptData1735224498985` adds initial data to the database.
    subscribers: [],
});

export default dataSource;
// Exports the `dataSource` instance for use throughout the application.