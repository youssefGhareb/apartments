import express from "express";
import "reflect-metadata";
import apartmentRoutes from "./routes/apartmentRoutes";
import dataSource from "./app-data-source";

const app = express();
app.use(express.json());

// Set up routes
app.use("/api/apartments", apartmentRoutes);

dataSource
    .initialize()
    .then(() => {
        console.log("Connected to the database");
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed", error);
    });
