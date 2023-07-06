import { Navigate, Outlet } from "react-router-dom";
function ProtectedRoutesComponent({ admin, token }) {
  if (admin === true && token && token.isAdmin === true) return <Outlet />;
  else if (admin === false && token && token.isAdmin === false)
    return <Outlet />;

  return <Navigate to="/login" />;
}

export default ProtectedRoutesComponent;
