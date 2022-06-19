import getToken from "./getToken";

function getUserFromToken() {
    var token = getToken("token")
    if (token != null & token != "") {
        var user = {
            id: JSON.parse(atob(token.split('.')[1])).id,
            email: JSON.parse(atob(token.split('.')[1])).username,
            roles: JSON.parse(atob(token.split('.')[1])).roles
        }
        return user;
    }
    return (null);
};
export default getUserFromToken;