import CartPageComponent from "./components/CartPageComponent";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const images = [
  "/images/img1.jpeg",
  "/images/img2.JPG",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img6.jpg",
  "/images/img7.png",
];

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems, cartSubtotal } = useSelector((state) => state.cart);
  return (
    <CartPageComponent
      reduxDispatch={dispatch}
      addToCartRedux={addToCart}
      cartItems={cartItems}
      cartSubtotal={cartSubtotal}
      removeFromCartRedux={removeFromCart}
    />
  );
}

export default CartPage;
