import UserOrdersPageComponent from "./components/UserOrdersPageComponent";

import { getOrdersUserApi } from "../../service/orderService";

import { useSelector } from "react-redux";

function UserOrdersPage() {
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  return (
    <UserOrdersPageComponent
      getOrdersUserApi={getOrdersUserApi}
      userInfo={userInfo}
    />
  );
}

export default UserOrdersPage;
