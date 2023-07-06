import UserCartDetailPageComponent from "./components/UserCartDetailPageComponent";

import { useSelector, useDispatch } from "react-redux";

import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

import { getProfileApi } from "../../service/userService";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { createOrderApi } from "../../service/orderService";
function UserCartDetailPage() {
  const dispatch = useDispatch();

  const { cartItems, cartSubtotal, itemsCount } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const [user, setUser] = useState();

  useEffect(() => {
    getProfileApi(userInfo._id)
      .then((res) => {
        setUser((prev) => {
          return { ...prev, ...res };
        });
      })
      .catch((error) => toast.error(error));
  }, []);

  return (
    <>
      {user && (
        <UserCartDetailPageComponent
          cartItems={cartItems}
          cartSubtotal={cartSubtotal}
          reduxDispatch={dispatch}
          addToCart={addToCart}
          removeFromCartRedux={removeFromCart}
          userInfo={user}
          itemsCount={itemsCount}
          createOrderApi={createOrderApi}
        />
      )}
    </>
  );
}

export default UserCartDetailPage;
