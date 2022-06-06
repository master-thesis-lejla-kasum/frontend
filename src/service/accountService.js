import axios from "axios";

const createAccount = (baseUrl, request) => axios.post(baseUrl + "/api/v1/account", request);

export default { createAccount };