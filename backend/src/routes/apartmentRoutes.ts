import { createApartment, getApartmentById, getApartments } from "../controllers/apartmentController";
import { Router } from "express";


const router = Router(); // Creating a new router instance to define apartment-related routes.

router.get("/", getApartments);     // Defines a GET route at `/` to fetch all apartments.
router.get("/:id", getApartmentById);   // Defines a GET route at `/:id` to fetch a specific apartment by its ID.
                                        // The `:id` is a route parameter that captures the apartment ID from the URL.
router.post("/", createApartment);  // Defines a POST route at `/` to add a new apartment.

export default router;