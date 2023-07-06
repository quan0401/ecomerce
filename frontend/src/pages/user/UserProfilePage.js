import UserProfilePageComponent from "./components/UserProfilePageComponent";

import { logoutState } from "../../redux/actions/userActions";
import { updateProfileApi, getProfileApi } from "../../service/userService";
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/actions/userActions";

function UserProfilePage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  return (
    <UserProfilePageComponent
      logoutState={logoutState}
      updateProfileApi={updateProfileApi}
      getProfileApi={getProfileApi}
      userInfo={userInfo}
      reduxDispatch={dispatch}
      setReduxUserState={setReduxUserState}
      sessionStorage={window.sessionStorage}
      localStorage={window.localStorage}
    />
  );
}

export default UserProfilePage;
