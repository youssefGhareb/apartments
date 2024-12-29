import express from "express";
import cors from "cors"; // Importing CORS middleware to handle Cross-Origin Resource Sharing.
import "reflect-metadata"; // Enables TypeScript decorators (used by TypeORM).
import apartmentRoutes from "./routes/apartmentRoutes";
import dataSource from "./app-data-source";

const app = express(); // Initializing the Express application.
app.use(express.json());  // Middleware to parse incoming JSON requests and attach the parsed data to `req.body`.
app.use(cors()); // Enables CORS to allow requests from different origins (e.g., frontend at a different domain or port).
                // This is particularly useful in development when the frontend and backend run on separate servers.

app.use("/api/apartments", apartmentRoutes); // Mounting the apartment routes on the "/api/apartments" path.
                                            // Any route defined in `apartmentRoutes` will now be accessible under `/api/apartments`.

dataSource
    .initialize() // Initializing the database connection using TypeORM's `DataSource` instance.
    .then(() => {
        console.log("Connected to the database");
        // Logs a success message if the database connection is successful.
        app.listen(3000, () => {  // Starts the Express server on port 3000.
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed", error);
    });
