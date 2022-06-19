import axios from "axios";

const getAll = (baseUrl, token) => axios.get(baseUrl + "/api/v1/role", { headers: { Authorization: "Bearer " + token } });

export default { getAll };