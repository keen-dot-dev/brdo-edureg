import axios from "axios";
import { API_ENDPOINT } from "../constants";


const httpClient = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default httpClient;
