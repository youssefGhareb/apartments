import "reflect-metadata";
// Enables TypeScript decorators by importing metadata reflection support, required for TypeORM entities.
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
// Marks the `Apartment` class as a database entity. 
// This associates the class with a table named `apartment` in the database.
export class Apartment {
  @PrimaryGeneratedColumn()
  // Specifies the `id` field as the primary key and auto-generates its value.
  // This means the database will automatically assign unique values to this column for each record.
  id!: number;

  //The ! after each field name (e.g., id!: number) tells TypeScript that these properties will always be defined, avoiding compilation errors.

  @Column()
  // Maps the `name` field to a database column.
  name!: string;

  @Column()
  unitNumber!: string;

  @Column()
  project!: string;

  @Column("decimal")
  // Maps the `price` field to a database column of type `decimal`.
  price!: number;
}