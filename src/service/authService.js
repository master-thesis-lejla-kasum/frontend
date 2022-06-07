import axios from "axios";

const login = (baseUrl, request) => axios.post(baseUrl + "/api/v1/login", request);

export default { login };