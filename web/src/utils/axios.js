import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL,
});

export { instance as axios };
