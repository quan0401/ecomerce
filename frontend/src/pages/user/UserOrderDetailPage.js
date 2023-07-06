import UserOrderDetailPageComponent from "./components/UserOrderDetailPageComponent";

import { getOrderById } from "../../service/orderService";

import { useDispatch, useSelector } from "react-redux";

function UserOrderDetailPage() {
  return (
    <>
      <UserOrderDetailPageComponent getOrderById={getOrderById} />
    </>
  );
}

export default UserOrderDetailPage;
