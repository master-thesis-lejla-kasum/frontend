import axios from "axios";

const createAccount = (baseUrl, request) => axios.post(baseUrl + "/api/v1/account", request);

const updateAccount = (baseUrl, token, request, id) => axios.put(baseUrl + "/api/v1/account/" + id, request, { headers: { Authorization: "Bearer " + token } });

export default { createAccount, updateAccount };