import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use `import.meta.env` for Vite
});

export default api;
