import dataSource from "../app-data-source";
import { Apartment } from "../entities/Apartement";
import { NextFunction, Request, Response } from "express";

export const getApartments = async (req: Request, res: Response) => {
    try {
        const apartments: Apartment[] = await dataSource.manager.find(Apartment);
        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: "failed to fetch apartments" });
    }
}

export const getApartmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const apartment: Apartment | null = await dataSource.manager.findOneBy(Apartment, { id: parseInt(id) });

        if (!apartment) {
            res.status(404).json({ message: "Apartment not found" });
            return;
        }

        res.json(apartment);

    } catch (error) {
        res.status(500).json({ message: "failed to fetch apartment details" });
    }
}

export const createApartment = async (req: Request, res: Response, next: NextFunction) => {
    await dataSource.manager.insert(Apartment, req.body)
    .then((newId) => {
        res.json({
            message: "Successfully created apartment with ID : " + newId.identifiers[0].id,
        });
    })
    .catch((error) => {
        res.status(500).json({ message: "failed To create apartment", error: error });
    });
}