import axios from "axios";

//Essa serviço cria uma URL base

const api = axios.create({
    baseURL: 'https://api.covid19api.com'
})

export default api;