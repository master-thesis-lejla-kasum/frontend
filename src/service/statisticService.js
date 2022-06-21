import axios from "axios";

const create = (baseUrl, request, token) => axios.post(baseUrl + "/api/v1/statistic", request, { headers: { Authorization: "Bearer " + token } });

export default { create }