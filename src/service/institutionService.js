import axios from "axios";

const createInstitution = (baseUrl, request) => axios.post(baseUrl + "/api/v1/institution", request);

const updateInstitution = (baseUrl, token, request, id) => axios.put(baseUrl + "/api/v1/institution/" + id, request, { headers: { Authorization: "Bearer " + token } });

const getAll = (baseUrl, token, params) => axios.get(baseUrl + "/api/v1/institution", { headers: { Authorization: "Bearer " + token }, params: params })

export default { createInstitution, getAll, updateInstitution };