import AdminEditUserPageComponent from "./components/AdminEditUserPageComponent";

import {
  updateUserForAdminApi,
  getUserForAdminApi,
} from "../../service/userService";

function AdminEditUserPage() {
  return (
    <>
      <AdminEditUserPageComponent
        updateUserForAdminApi={updateUserForAdminApi}
        getUserForAdminApi={getUserForAdminApi}
      />
    </>
  );
}

export default AdminEditUserPage;
