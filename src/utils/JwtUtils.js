import jwtDecode from "jwt-decode";
import moment from "moment";

export const isAuthorized = (token) => {
  if (!token) return false;
  const payload = jwtDecode(token);

  if (moment().unix() > payload.exp) {
    return false;
  } else return true;
};
