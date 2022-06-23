import axios from "axios";

const submitApplicaion = (baseUrl, request) => axios.post(baseUrl + "/api/v1/application", request);

const search = (baseUrl, token, params) => axios.get(baseUrl + "/api/v1/application", { headers: { Authorization: "Bearer " + token }, params: params });

const update = (baseUrl, token, params, id) => axios.put(baseUrl + "/api/v1/application/" + id, {}, { headers: { Authorization: "Bearer " + token }, params: params });

export default { submitApplicaion, search, update };