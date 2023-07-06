import {
  Badge,
  Form,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  DropdownButton,
  Dropdown,
  InputGroup,
  Button,
} from "react-bootstrap";

import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logoutState } from "../redux/actions/userActions";

import { useEffect, useState } from "react";

import { getCategoriesAction } from "../redux/actions/categoryActions";

import { getBestsellerApi } from "../service/productService";

import socketIOClient from "socket.io-client";

import { setChatRoom, setNewNofi } from "../redux/actions/chatActions";
import { setSocket } from "../redux/actions/chatActions";

function HeaderComponent() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const callbackLogout = () => {
    navigate("/login");
  };

  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  const { itemsCount } = useSelector((state) => state.cart);

  const { categories } = useSelector((state) => state.category);

  const { newNofi } = useSelector((state) => state.adminChat);

  const [searchCategoryToggle, setSearchCatogoryToggle] = useState("All");

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    if (e.key && e.key !== "Enter") return;

    e.preventDefault();
    const searchCategory = searchCategoryToggle.replace(/\//g, ",");
    if (searchQuery.trim() !== "") {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else
        navigate(
          `/product-list/category/${searchCategory}/search/${searchQuery}`
        );
    } else {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list`);
      } else {
        navigate(`/product-list/category/${searchCategory}`);
      }
    }
  };

  useEffect(() => {
    const socket = socketIOClient();
    if (userInfo.isAdmin) {
      socket.emit(
        "admin connects to server",
        Math.floor(Math.random() * 10000)
      );
      socket.on(
        "server sends message from client to admin",
        ({ message, client }) => {
          dispatch(setNewNofi(true));
          dispatch(setSocket(socket));
          dispatch(setChatRoom(client, message));
        }
      );
    }
    return () => socket.disconnect();
  }, [userInfo.isAdmin]);

  // Good practive to put it in the dependency
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          Online-Shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <InputGroup>
              <DropdownButton
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item onClick={(e) => setSearchCatogoryToggle("All")}>
                  All
                </Dropdown.Item>
                {categories.map((category, index) => (
                  <Dropdown.Item
                    onClick={(e) => setSearchCatogoryToggle(category.name)}
                    key={index}
                  >
                    {category.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <Form.Control
                onKeyUp={handleSubmit}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
              />

              <Button onClick={handleSubmit} variant="warning">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/cart">
              <Badge pill bg="danger">
                {itemsCount !== 0 && itemsCount}
              </Badge>

              <i className="bi bi-cart"></i>

              <span className="ms-1">Cart</span>
            </Nav.Link>
            {userInfo.isAdmin ? (
              <>
                <Nav.Link as={NavLink} to="/admin/my-orders">
                  Admin
                  {newNofi && (
                    <span className="position-absolute top-2 start-90 translate-middle p-2 bg-danger border border-light rounded-circle">
                      {/* <span className="visually-hidden">New alerts</span> */}
                    </span>
                  )}
                </Nav.Link>

                <NavDropdown
                  title={userInfo.firstName + " " + userInfo.lastName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logoutState(callbackLogout));
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : !userInfo.isAdmin && userInfo.firstName ? (
              <>
                <NavDropdown
                  title={userInfo.firstName + " " + userInfo.lastName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={NavLink}
                    eventKey="/user/my-orders"
                    to="/user/my-orders"
                  >
                    My orders
                  </NavDropdown.Item>

                  <NavDropdown.Item as={NavLink} to="/user/">
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logoutState(callbackLogout));
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
