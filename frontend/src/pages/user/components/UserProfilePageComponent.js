import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";

import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const userInfoDefault = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  country: "",
  city: "",
  address: "",
  oldPassword: "",
  password: "",
  repeatPassword: "",
  _id: "",
  email: "",
};

function UserProfilePageComponent({
  logoutState,
  updateProfileApi,
  getProfileApi,
  userInfo,
  reduxDispatch,
  setReduxUserState,
  sessionStorage,
  localStorage,
}) {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const [updatedInfo, setUpdatedInfo] = useState(userInfoDefault);

  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    getProfileApi(userInfo._id).then((res) =>
      setUpdatedInfo((prev) => ({ ...prev, ...res }))
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    event.stopPropagation();

    const form = event.currentTarget;

    if (
      form.checkValidity() === true &&
      updatedInfo.password === updatedInfo.repeatPassword
    ) {
      updateProfileApi(updatedInfo)
        .then((res) => {
          setUpdateStatus(true);

          setUpdatedInfo((prev) => ({
            ...prev,
            password: "",
            repeatPassword: "",
            oldPassword: "",
          }));

          const { userUpdated } = res;

          const newUserInfo = {
            ...userUpdated,
            doNotLogout: userInfo.doNotLogout,
          };

          if (newUserInfo.doNotLogout) {
            localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
          } else {
            sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));
          }
          reduxDispatch(setReduxUserState(newUserInfo));

          toast.success("User updated");

          setValidated(false);
        })
        .catch((error) => {
          toast.error(error);

          reduxDispatch(
            logoutState(function () {
              navigate("/login");
            })
          );
        });
    }

    setValidated(true);
  };

  const inputHandler = (fieldName, value) => {
    setUpdatedInfo((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md={6}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Label as="h1">User Profile</Form.Label>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="fw-bold">First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                defaultValue={updatedInfo.firstName}
                onChange={(e) => inputHandler("firstName", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your fist name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="fw-bold">Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                defaultValue={updatedInfo.lastName}
                onChange={(e) => inputHandler("lastName", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                disabled
                type="email"
                placeholder="Enter email address"
                name="email"
                defaultValue={updatedInfo.email}
              />

              <Form.Text type="muted">
                If you want the change email, remove account and create new one
                with new email address
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label className="fw-bold">Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phoneNumber"
                defaultValue={updatedInfo.phoneNumber}
                onChange={(e) => inputHandler("phoneNumber", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
              <Form.Label className="fw-bold">Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                name="country"
                defaultValue={updatedInfo.country}
                onChange={(e) => inputHandler("country", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="city  ">
              <Form.Label className="fw-bold">City </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city  "
                name="city"
                defaultValue={updatedInfo.city}
                onChange={(e) => inputHandler("city", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                defaultValue={updatedInfo.address}
                onChange={(e) => inputHandler("address", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Old password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your old password"
                name="oldPassword"
                defaultValue={updatedInfo.oldPassword}
                onChange={(e) => inputHandler("oldPassword", e.target.value)}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Please enter password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                defaultValue={updatedInfo.password}
                onChange={(e) => inputHandler("password", e.target.value)}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Please enter password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
              <Form.Label className="fw-bold">Repeat Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter repeat password"
                name="repeatPassword"
                defaultValue={updatedInfo.repeatPassword}
                onChange={(e) => inputHandler("repeatPassword", e.target.value)}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Please enter repeat password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit">
              Update
            </Button>
          </Form>

          {updateStatus === true && (
            <Alert className="mt-3" variant="info">
              User updated
            </Alert>
          )}
          {/* <Alert variant="danger">User with that email already exists!</Alert> */}
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfilePageComponent;
