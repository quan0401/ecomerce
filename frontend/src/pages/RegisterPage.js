import RegisterPageComponent from "./components/RegisterPageComponent";

import { registerUser } from "../service/userService";

import { useSelector } from "react-redux";

function RegisterPage() {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  return (
    <RegisterPageComponent userInfo={userInfo} registerUser={registerUser} />
  );
}

export default RegisterPage;
