import * as actionTypes from "../constants/userConstants";
import { clearToken } from "../../service/cookieService";
export const setReduxUserState = (user) => (dispatch) => {
  dispatch({
    type: actionTypes.LOGIN_USER,
    payload: { ...user },
  });
};

export const logoutState = (callback) => (dispatch) => {
  if (typeof callback === "function") {
    callback();
  }
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("userInfo");
  clearToken().then((res) => {});
  dispatch({
    type: actionTypes.LOGOUT_USER,
  });
};
