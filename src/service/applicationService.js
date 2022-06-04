import axios from "axios";

const submitApplicaion = (baseUrl, request) => axios.post(baseUrl + "/application", request);

export default { submitApplicaion };