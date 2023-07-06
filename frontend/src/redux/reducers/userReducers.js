import * as actionTypes from "../constants/userConstants";

export const userRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return { ...state, userInfo: action.payload };
    case actionTypes.LOGOUT_USER:
      // if (JSON.stringify(checkLoginToNavigate) !== "{}")
      //   navigate("/home", { replace: true });
      return { userInfo: {} };
    default:
      return state;
  }
};
