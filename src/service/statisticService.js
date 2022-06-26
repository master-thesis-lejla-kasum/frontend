import axios from "axios";

const create = (baseUrl, request, token) => axios.post(baseUrl + "/api/v1/statistic", request, { headers: { Authorization: "Bearer " + token } });
const getStatistic = (baseUrl, params) => axios.get(baseUrl + "/api/v1/statistic", { params: params });

export default { create, getStatistic }