import axios from "axios";

const search = (baseUrl, params) => axios.get(baseUrl + "/api/v1/article", { params: params });

const getTotal = (baseUrl, params) => axios.get(baseUrl + "/api/v1/article/total", { params: params });

const getById = (baseUrl, id) => axios.get(baseUrl + "/api/v1/article/" + id);

const create = (baseUrl, request, token) => axios.post(baseUrl + "/api/v1/article", request, { headers: { Authorization: "Bearer " + token } });

export default { search, getTotal, getById, create };