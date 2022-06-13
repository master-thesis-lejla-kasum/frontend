import axios from "axios";

const search = (baseUrl, params) => axios.get(baseUrl + "/api/v1/article", { params: params });

const getTotal = (baseUrl, params) => axios.get(baseUrl + "/api/v1/article/total", { params: params });

const getById = (baseUrl, id) => axios.get(baseUrl + "/api/v1/article/" + id);

export default { search, getTotal, getById };