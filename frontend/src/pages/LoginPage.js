import { loginUser } from "../service/userService";

import { setReduxUserState } from "../redux/actions/userActions";

import { useDispatch } from "react-redux";

import LoginPageComponent from "./components/LoginPageComponents";

import { useSelector } from "react-redux";

function LoginPage() {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const dispatch = useDispatch();

  return (
    <LoginPageComponent
      setReduxUserState={setReduxUserState}
      loginUser={loginUser}
      reduxDispatch={dispatch}
      userInfo={userInfo}
    />
  );
}

export default LoginPage;
