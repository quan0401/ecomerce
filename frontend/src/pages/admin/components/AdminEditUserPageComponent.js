import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { toast } from "react-toastify";

function AdminEditUserPageComponent({
  updateUserForAdminApi,
  getUserForAdminApi,
}) {
  const { id: userId } = useParams();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  });

  useEffect(() => {
    getUserForAdminApi(userId)
      .then((res) => {
        const { firstName, lastName, email, isAdmin } = res;

        setUserData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email,
          isAdmin,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    e.stopPropagation();

    const form = e.currentTarget.elements;

    updateUserForAdminApi(userId, {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      isAdmin: form.isAdmin.checked,
    })
      .then((res) => {
        const { savedUser, EC, EM } = res;

        if (EC === 0) {
          setUserData((prev) => ({ ...prev, ...savedUser }));

          toast.success(EM);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Edit user</h1>
          <Button as={Link} to="/admin/users" className="mb-3" variant="info">
            Go back
          </Button>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
                name="firstName"
                defaultValue={userData.firstName}
                type="text"
                placeholder="First name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name="lastName"
                defaultValue={userData.lastName}
                type="text"
                placeholder="lastName"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                defaultValue={userData.email}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                name="isAdmin"
                defaultChecked={userData.isAdmin}
                type="checkbox"
                label="Is admin"
              />
            </Form.Group>

            <Button variant="warning" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminEditUserPageComponent;
