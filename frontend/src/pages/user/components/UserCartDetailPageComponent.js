import {
  Container,
  Col,
  Row,
  Form,
  Alert,
  Button,
  ListGroup,
} from "react-bootstrap";

import CartItemComponent from "../../../components/CartItemComponent";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function UserCartDetailPageComponent({
  cartItems,
  cartSubtotal,
  itemsCount,
  reduxDispatch,
  addToCart,
  removeFromCartRedux,
  userInfo,
  createOrderApi,
}) {
  const navigate = useNavigate();

  const [missingInfo, setMissingInfo] = useState("");

  const [disableButton, setDisableButton] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("momo");

  useEffect(() => {
    const { city, country, address, phoneNumber, email } = userInfo;

    if (city && country && address && phoneNumber && email)
      setDisableButton(false);
    else {
      setMissingInfo(
        "In order to make order, fill out your profile with correct address, city etc."
      );
    }
  }, [userInfo._id]);

  const changeCount = (productId, quantity) => {
    const changeQuantiy = true;

    reduxDispatch(addToCart(productId, quantity, changeQuantiy));
  };

  const removeFromCart = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCartRedux(productId, quantity, price));
    }
  };

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount,
        cartSubTotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        count: item.count,
        image: { url: item.image.url ? item.image.url : null },
      })),
      paymentMethod,
    };

    createOrderApi(orderData)
      .then((res) => {
        const {
          order: { _id },
        } = res;

        navigate(`/user/order-detail/${_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <h1 className="mb-4">Cart Details</h1>

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
                defaultValue="momo"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="momo">Momo</option>

                <option value="paypal">Paypal</option>

                <option value="cod">
                  Cash on delivery (delivery may be delayed)
                </option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Alert variant="danger">Not delivered. {missingInfo}</Alert>
            </Col>

            <Col md={6}>
              <Alert variant="info">Not paid yet.</Alert>
            </Col>
          </Row>

          {/* Order items */}
          <h2>Order items</h2>

          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <CartItemComponent
                changeCount={changeCount}
                removeFromCartRedux={removeFromCart}
                key={index}
                item={item}
              />
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item className="fs-2">Order summary</ListGroup.Item>

            <ListGroup.Item>
              Price (after tax): <b>{cartSubtotal} $</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Shipping <b>Included</b>
            </ListGroup.Item>

            <ListGroup.Item>
              Tax: <b>Included</b>
            </ListGroup.Item>

            <ListGroup.Item className="text-danger">
              Total price:
              <b>{cartSubtotal} $</b>
            </ListGroup.Item>

            <ListGroup.Item className="d-grid">
              <Button
                onClick={orderHandler}
                disabled={disableButton}
                variant="success"
              >
                Place order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserCartDetailPageComponent;
