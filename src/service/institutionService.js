import axios from "axios";

const getInstitutions = (baseUrl) => axios.get(baseUrl + "/api/v1/institution");

export default { getInstitutions };