// Users Pages
import UserCartDetailPage from "../pages/user/UserCartDetailPage";
import UserOrderDetailPage from "../pages/user/UserOrderDetailPage";
import UserOrdersPage from "../pages/user/UserOrdersPage";
import UserProfilePage from "../pages/user/UserProfilePage";

// Admin Pages
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "../pages/admin/AdminChatsPage";
import AdminCreateProductPage from "../pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "../pages/admin/AdminEditProductPage";
import AdminOrderDetailsPage from "../pages/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminProductPage from "../pages/admin/AdminProducstPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminEditUserPage from "../pages/admin/AdminEditUserPage";

const routes = [
  // User Pages
  { path: "/user", Component: UserProfilePage },
  { path: "/user/cart-detail", Component: UserCartDetailPage },
  { path: "/user/order-detail/:id", Component: UserOrderDetailPage },
  { path: "/user/my-orders", Component: UserOrdersPage },

  // Admin Pages
  { path: "/admin/analytics", Component: AdminAnalyticsPage },
  { path: "/admin/chats", Component: AdminChatsPage },
  { path: "/admin/create-new-product", Component: AdminCreateProductPage },
  { path: "/admin/edit-product/:id", Component: AdminEditProductPage },
  { path: "/admin/edit-user/:id", Component: AdminEditUserPage },
  { path: "/admin/order-detail/:id", Component: AdminOrderDetailsPage },
  { path: "/admin/my-orders", Component: AdminOrdersPage },
  { path: "/admin/products", Component: AdminProductPage },
  { path: "/admin/users", Component: AdminUsersPage },
];
export default routes;
