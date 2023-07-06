import { useEffect, useState } from "react";

import {
  Container,
  Col,
  Row,
  Form,
  Alert,
  Button,
  ListGroup,
} from "react-bootstrap";

import { useParams } from "react-router-dom";

import CartItemComponent from "../../../components/CartItemComponent";

const images = [
  "/images/img1.jpeg",
  "/images/img2.JPG",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img6.jpg",
  "/images/img7.png",
];

function UserOrderDetailPageComponent({ getOrderById }) {
  const [order, setOrder] = useState({});

  const [userInfo, setUser] = useState({});

  const { id } = useParams();

  const changePaymentMethod = (value) => {
    setOrder((prev) => ({ ...prev, paymentMethod: value }));
  };

  useEffect(() => {
    getOrderById(id)
      .then((res) => {
        setUser(res.user);

        delete res.user;

        setOrder(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1 className="mb-4">Order Details</h1>

          <Row>
            <Col md={6}>
              <h2>Shipping</h2>

              <div>
                <b>Name: </b>
                {userInfo?.firstName} {userInfo?.lastName}
              </div>

              <div>
                <b>Address: </b>
                {userInfo?.address} {userInfo?.city} {userInfo?.country}
              </div>

              <div>
                <b>Phone: </b>

                {userInfo?.phoneNumber}
              </div>
            </Col>

            <Col md={6}>
              <h2>Payment method</h2>

              <Form.Select
                onChange={(e) => changePaymentMethod(e.target.value)}
                defaultValue={order?.paymentMethod}
              >
                <option value="momo">Momo</option>

                <option value="papal">Paypal</option>

                <option value="cod">
                  Cash on delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              {order.isDelivered === true ? (
                <Alert variant="success">Delivered</Alert>
              ) : (
                <Alert variant="danger">Not delivered</Alert>
              )}
            </Col>
            <Col md={6}>
              {order.isPaid === true ? (
                <Alert variant="success">Paid {order?.paidAt}</Alert>
              ) : (
                <Alert variant="danger">Not paid yet</Alert>
              )}
            </Col>
          </Row>

          {/* Order items */}
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {order.cartItems &&
              order.cartItems.map((item, index) => (
                <CartItemComponent disabled key={index} item={item} />
              ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item className="fs-3">Order summary</ListGroup.Item>

            <ListGroup.Item>
              Price (after tax): <b>{order?.orderTotal?.cartSubTotal} $</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Shipping <b>Included</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Tax: <b>Included</b>
            </ListGroup.Item>

            <ListGroup.Item className="text-danger">
              Total price:
              <b> {order?.orderTotal?.cartSubTotal} $</b>
            </ListGroup.Item>

            <ListGroup.Item className="d-grid">
              <Button disabled={order.isPaid} variant="success">
                {order.isPaid
                  ? "Order Finished. Thank you"
                  : order.paymentMethod === "cod"
                  ? "Wait for your order. You pay on delivery"
                  : "Pay for the order"}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserOrderDetailPageComponent;
