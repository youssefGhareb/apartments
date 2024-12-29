import dataSource from "../app-data-source"; // Importing the TypeORM data source instance to interact with the database.

import { Apartment } from "../entities/Apartement"; // Importing the `Apartment` entity, which represents the structure of the `apartment` table in the database.

import { Request, Response } from "express"; // Importing types for Express request, and response for type safety.

export const getApartments = async (req: Request, res: Response) => {
    // Controller function to fetch all apartments from the database.

    const { name, unitNumber, project } = req.query; // Destructuring query parameters for filtering apartments.

    const where: any = {}; // Object to store dynamic filtering conditions.

    const queryBuilder = dataSource.manager
        .getRepository(Apartment) // Accessing the `Apartment` repository through TypeORM's manager.
        .createQueryBuilder('apartment'); // Creating a query builder for the `apartment` table.

    // Adding conditions for filtering if parameters are provided in the request query.
    if (name) {
        queryBuilder.andWhere('apartment.name LIKE :name', { name: `%${name}%` });
    }

    if (unitNumber) {
        queryBuilder.andWhere('apartment.unitNumber LIKE :unitNumber', { unitNumber: `%${unitNumber}%` });
    }

    if (project) {
        queryBuilder.andWhere('apartment.project LIKE :project', { project: `%${project}%` });
    }

    try {
        const apartments: Apartment[] = await queryBuilder.getMany();
        // Fetching apartments from the database based on the query.

        res.json(apartments);
        // Sending the list of apartments as a JSON response.
    } catch (error) {
        res.status(500).json({ message: "failed to fetch apartments" });
        // Sending a 500 error response if something goes wrong.
    }
}

export const getApartmentById = async (req: Request, res: Response) => {
    // Controller function to fetch a single apartment by its ID.
    try {
        const { id } = req.params;
        // Extracting the `id` parameter from the request URL.

        const apartment: Apartment | null = await dataSource.manager.findOneBy(Apartment, { id: parseInt(id) });
        // Using TypeORM's `findOneBy` method to fetch the apartment with the specified ID.
        // `parseInt` converts the `id` from a string to a number.

        if (!apartment) {
            res.status(404).json({ message: "Apartment not found" });
            // If no apartment is found, return a 404 response with an appropriate message.
            return;
        }

        res.json(apartment);
        // Sending the apartment details as a JSON response.

    } catch (error) {
        res.status(500).json({ message: "failed to fetch apartment details" });
        // Sending a 500 error response if an error occurs.
    }
}

export const createApartment = async (req: Request, res: Response) => {
    // Controller function to create a new apartment.

    console.log(req.body);
    await dataSource.manager.insert(Apartment, req.body) // Using TypeORM's `insert` method to add a new row to the `Apartment` table.
        // The data is taken directly from the request body (`req.body`).
        .then((newId) => {
            res.json({ // On successful insertion, return a success message along with the newly created apartment's ID.
                message: "Successfully created apartment with ID : " + newId.identifiers[0].id,

            });
        })
        .catch((error) => {
            res.status(500).json({ message: "failed To create apartment", error: error });
            // If an error occurs, send a 500 error response with an appropriate message.
        });
}