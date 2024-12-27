import { createApartment, getApartmentById, getApartments } from "../controllers/apartmentController";
import { Router } from "express";


const router = Router();

router.get("/", getApartments);
router.get("/:id", getApartmentById);
router.post("/", createApartment);

export default router;