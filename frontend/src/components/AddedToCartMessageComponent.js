import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AddedToCartMessageComponent({ show, setShow }) {
  // const [show, setShow] = useState(true);
  const navigate = useNavigate();
  return (
    <Alert
      show={show}
      variant="success"
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart</Alert.Heading>
      {/* <p>
        Change this and that and try again. Duis mollis, est non commodo luctus,
        nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis
        consectetur purus sit amet fermentum.
      </p> */}
      <Button variant="danger" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Link to="/cart">
        <Button className="ms-2" variant="warning">
          Go to cart
        </Button>
      </Link>
    </Alert>
  );
}

export default AddedToCartMessageComponent;
