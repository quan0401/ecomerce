// Users Pages
import UserCartDetailPage from "../pages/user/UserCartDetailPage";
import UserOrderDetailPage from "../pages/user/UserOrderDetailPage";
import UserOrdersPage from "../pages/user/UserOrdersPage";
import UserProfilePage from "../pages/user/UserProfilePage";

const routes = [
  // User Pages
  { path: "/user", Component: UserProfilePage },
  { path: "/user/cart-detail", Component: UserCartDetailPage },
  { path: "/user/order-detail/:id", Component: UserOrderDetailPage },
  { path: "/user/my-orders", Component: UserOrdersPage },
];
export default routes;
