import { Container, Row, Col, ListGroup, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItemComponent from "../../components/CartItemComponent";
import { LinkContainer } from "react-router-bootstrap";

const images = [
  "/images/img1.jpeg",
  "/images/img2.JPG",
  "/images/img3.jpeg",
  "/images/img4.jpeg",
  "/images/img6.jpg",
  "/images/img7.png",
];

function CartPageComponent({
  reduxDispatch,
  addToCartRedux,
  cartItems,
  cartSubtotal,
  removeFromCartRedux,
}) {
  const changeCount = (productId, quantity) => {
    const changeProductQuantity = true;
    reduxDispatch(addToCartRedux(productId, quantity, changeProductQuantity));
  };

  const removeFromCartHandler = (productId, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCartRedux(productId, quantity, price));
    }
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {cartItems.map((item, index) => (
              <div key={index}>
                <CartItemComponent
                  changeCount={changeCount}
                  item={item}
                  key={index}
                  removeFromCartRedux={removeFromCartHandler}
                />
              </div>
            ))}

            {cartItems.length === 0 && (
              <Alert variant="info" className="m-3">
                Your cart is empty
              </Alert>
            )}
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item className="h4">
              Subtotal: {cartItems.length}{" "}
              {cartItems.length <= 0 ? "Product" : "Products"}
            </ListGroup.Item>

            <ListGroup.Item>
              Total price: <span className="fw-bold">{cartSubtotal}</span>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-grid">
                <LinkContainer to="/user/cart-detail">
                  <Button disabled={cartItems.length === 0} variant="success">
                    Proceed to Checkout
                  </Button>
                </LinkContainer>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CartPageComponent;
