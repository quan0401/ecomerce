import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import publicRoutes from "./routes/publicRoutes";

import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";

import adminProtectedRoutes from "./routes/adminProtectedRoutes";
import userProtectedRoutes from "./routes/userProtectedRoutes";

import RoutesUserChatComponent from "./components/user/RoutesUserChatComponent";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ScrollToTop from "./utils/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { getToken } from "./service/cookieService";
import { useSelector } from "react-redux";

function App() {
  const [token, setToken] = useState();
  const {
    userRegisterLogin: { userInfo },
  } = useSelector((state) => state);

  useEffect(() => {
    getToken().then((res) => setToken(res));
  }, [userInfo._id]);

  return (
    <div className="App">
      {/* Public routes */}
      <Router>
        <ScrollToTop />

        <HeaderComponent />
        <Routes>
          <Route element={<RoutesUserChatComponent />}>
            {publicRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.Component />}
              />
            ))}
          </Route>

          {/* User protected routes */}
          {token && (
            <>
              <Route
                element={
                  <ProtectedRoutesComponent admin={false} token={token} />
                }
              >
                {userProtectedRoutes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.Component />}
                    />
                  );
                })}
              </Route>

              {/* Admin routes */}
              <Route
                element={
                  <ProtectedRoutesComponent admin={true} token={token} />
                }
              >
                {adminProtectedRoutes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.Component />}
                    />
                  );
                })}
              </Route>
            </>
          )}
        </Routes>
        <FooterComponent />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
