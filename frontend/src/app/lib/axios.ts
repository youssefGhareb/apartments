import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api", // Update with your backend's URL
    timeout: 10000, // 10 seconds timeout
});

export default apiClient;