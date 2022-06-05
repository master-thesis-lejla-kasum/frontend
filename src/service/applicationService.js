import axios from "axios";

const submitApplicaion = (baseUrl, request) => axios.post(baseUrl + "/api/v1/application", request);

export default { submitApplicaion };