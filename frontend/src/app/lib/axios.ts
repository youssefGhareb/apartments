import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",   // Update with your backend's URL
                                            // Setting the base URL for all API requests.

    timeout: 10000, // Setting a timeout of 10 seconds for requests.
                    // If a request takes longer than 10 seconds, it will throw a timeout error.
});

export default apiClient;
// Exporting the configured Axios instance for use across the application.