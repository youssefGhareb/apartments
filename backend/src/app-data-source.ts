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
    synchronize: true,
    logging: true,
    entities: [Apartment],
    migrations: [InsertAptData1735224498985],
    subscribers: [],
});

export default dataSource;