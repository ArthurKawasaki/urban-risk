import axios from "axios";
import { API_URL } from "../config";
/**
 * Conexao com o backend Spring Boot, seguindo o modelo das aulas.
 * Web: localhost; emulador Android: 10.0.2.2.
 * Celular fisico: configure EXPO_PUBLIC_API_URL com o IP do computador.
 */
const BASE_URL = API_URL;
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;
