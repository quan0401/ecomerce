import { Outlet } from "react-router-dom";
import UserChatComponent from "./UserChatComponent/UserChatComponent";

function RoutesUserChatComponent() {
  return (
    <>
      <Outlet />
      <UserChatComponent />
    </>
  );
}

export default RoutesUserChatComponent;
