import { Form, ListGroup, Button, Image, Row, Col } from "react-bootstrap";

function CartItemComponent({
  img,
  item,
  disabled,
  changeCount = false,
  removeFromCartRedux = false,
}) {
  if (img === undefined) {
    img = "/images/img1.jpeg";
  }

  return (
    <ListGroup.Item className="py-4">
      <div className="d-md-flex justify-content-around align-items-center">
        <Row className="align-items-center">
          <Col md={3}>
            <div>
              <Image
                crossOrigin="anonymous"
                src={img}
                fluid
                style={{ objectFit: "cover" }}
              />
            </div>
          </Col>

          <Col md={9}>
            <div className="mt-3 mt-md-0">
              Name: <b>{item?.name}</b>{" "}
            </div>

            <div className="mt-3">
              Price: <b>{item?.price} $</b>
            </div>

            <Form.Select
              onChange={
                changeCount
                  ? (e) => {
                      changeCount(item?.productId, e.target.value);
                    }
                  : undefined
              }
              disabled={disabled}
              className="mt-3"
              aria-label="Default select example"
              defaultValue={item?.quantity}
            >
              {Array.from({ length: item?.count }).map((item, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </Form.Select>

            <div className="text-secondary mt-3">{item?.count} in stock</div>

            {/* Trash Button */}
            <Button
              disabled={disabled}
              className="mt-3"
              variant="secondary"
              onClick={
                removeFromCartRedux
                  ? () =>
                      removeFromCartRedux(
                        item.productId,
                        item.quantity,
                        item.price
                      )
                  : undefined
              }
            >
              <i className="text-white bi bi-trash-fill"></i>
            </Button>
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  );
}

export default CartItemComponent;
