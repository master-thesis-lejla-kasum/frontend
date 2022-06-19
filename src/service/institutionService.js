import axios from "axios";

const createInstitution = (baseUrl, request) => axios.post(baseUrl + "/api/v1/institution", request);

const getAll = (baseUrl, token, params) => axios.get(baseUrl + "/api/v1/institution", { headers: { Authorization: "Bearer " + token }, params: params })

export default { createInstitution, getAll };