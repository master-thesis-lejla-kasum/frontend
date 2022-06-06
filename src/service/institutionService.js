import axios from "axios";

const createInstitution = (baseUrl, request) => axios.post(baseUrl + "/api/v1/institution", request);

export default { createInstitution };