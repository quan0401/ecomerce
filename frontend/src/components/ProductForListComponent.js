import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
const images = [
  "images/img1.jpeg",
  "images/img2.JPG",
  "images/img3.jpeg",
  "images/img4.jpeg",
  "images/img6.jpg",
  "images/img7.png",
];

function ProductForListComponent({ item }) {
  return (
    <Card>
      <Row className="align-items-center justify-content-between">
        <Col xl={12} lg={5}>
          <Card.Img
            style={{
              objectFit: "cover",
              maxHeight: "30vh",
              objectPosition: "center",
            }}
            variant="top"
            src={item.images[0].url || images[0]}
          />
        </Col>

        <Col xl={12} lg={7}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <div>
              <b>Category: </b> {item.category}
            </div>
            <Card.Text>{item.description}</Card.Text>
            <Rating
              initialValue={item.rating}
              className="mb-3"
              readonly
              size={24}
            />
            <span>({item.reviewsNumber})</span>
            <br />
            <Card.Text className="fw-bold size fs-4">{item.price} $</Card.Text>
            <Link to={`/product-detail/${item._id}`}>
              <Button variant="danger">See Product</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ProductForListComponent;
