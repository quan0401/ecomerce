import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useNavigate } from "react-router-dom";
import { logoutState } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function AdminLinksComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanleLougout = () => {
    window.location.href = "/login";
    dispatch(logoutState());
  };

  return (
    <Navbar>
      <Nav
        defaultActiveKey="/home"
        className="flex-column bg-light"
        variant="light"
        style={{ width: "100%" }}
      >
        <LinkContainer to="/admin/my-orders">
          <Nav.Link>Orders</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/products">
          <Nav.Link>Products</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/users">
          <Nav.Link>User List</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/chats">
          <Nav.Link>Chats</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/analytics">
          <Nav.Link>Analytics</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/logout" onClick={hanleLougout}>
          <Nav.Link>Logout</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

export default AdminLinksComponent;
