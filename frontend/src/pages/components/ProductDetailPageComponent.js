import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";

import { Rating } from "react-simple-star-rating";

import { useEffect, useState, useRef } from "react";

import ImageZoom from "js-image-zoom";

import { useParams } from "react-router-dom";
import { writeReviewApi } from "../../service/userService";
import MetaComponent from "../../components/MetaComponent";

const images = ["/images/img1.jpeg", "/images/img2.JPG", "/images/img3.jpeg"];

const option = {
  // width: 400,
  // zoomWidth: 500,
  // offset: { vertical: 0, horizontal: 10 },
  scale: 2,
  offset: { vertical: 0, horizontal: 0 },
};

function ProductDetailPageComponent({
  addToCartRedux,
  getProductByIdApi,
  reduxDispatch,
  userInfo,
  product,
  setProductState,
}) {
  const { id: productId } = useParams();

  const [quantity, setQuantity] = useState(1);

  const [showMessage, setShowMessage] = useState(false);

  const handleAddToCart = () => {
    addToCartRedux(productId, +quantity);

    setShowMessage(true);
  };

  useEffect(() => {
    images.forEach((item, index) => {
      new ImageZoom(document.getElementById("img-" + index), option);
    });
  });

  const messageEndRef = useRef(null);

  const handleWriteReview = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;
    let { comment, rating } = form;
    rating.value = Number(rating.value);
    if (
      e.currentTarget.checkValidity() &&
      comment.value &&
      rating.value !== "your_rating"
    ) {
      writeReviewApi(productId, {
        rating: +rating.value,
        comment: comment.value,
      })
        .then((res) => {
          if (res.EC === 0) {
            setProductState((prev) => !prev);
            messageEndRef.current.scrollIntoView({
              behavior: "smooth",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <MetaComponent description={product?.description} title={product?.name} />
      <Container>
        <AddedToCartMessageComponent
          show={showMessage}
          setShow={setShowMessage}
        />
        <Row className="mt-3">
          {product && (
            <Col style={{ zIndex: 1 }} md={4} className="p-4">
              {product.images.map((img, index) => (
                <div key={index} id={"img-" + index}>
                  <Image
                    crossOrigin="anonymous"
                    className="mb-3"
                    src={img.url}
                    style={{ objectFit: "cover" }}
                    rounded
                    fluid
                  />
                </div>
              ))}
            </Col>
          )}

          <Col md={8}>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item as={"h1"}>{product?.name}</ListGroup.Item>

                  <ListGroup.Item>
                    <Rating size={24} initialValue={product?.rating} />

                    <span style={{ marginTop: "-12px" }}>
                      ({product?.reviewsNumber})
                    </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price: <span className="fw-bold">${product?.price} </span>
                  </ListGroup.Item>

                  <ListGroup.Item>{product?.description}</ListGroup.Item>
                </ListGroup>
                <hr />
              </Col>

              <Col md={4}>
                <ListGroup>
                  <ListGroup.Item>
                    Status: <span className="fw-bold">In stock</span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Price: <span className="fw-bold">${product?.price} </span>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Quantity:{" "}
                    <Form.Select
                      className="my-2"
                      onChange={(e) => setQuantity(e.target.value)}
                      name="quantity"
                    >
                      {product &&
                        Array.from({ length: product.count }).map(
                          (item, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          )
                        )}
                    </Form.Select>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        onClick={handleAddToCart}
                        variant="success"
                        size="lg"
                      >
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            {/* Reviews */}
            <ListGroup variant="flush">
              <div className="h1">Reviews</div>

              {product &&
                product.reviews.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <div className="fw-bold">{item.user.name}</div>

                    <Rating initialValue={+item.rating} size={20} />

                    <div>12/2/2020</div>

                    <div>{item.comment}</div>
                  </ListGroup.Item>
                ))}

              <ListGroup.Item>
                {userInfo && !userInfo._id && (
                  <Alert className="mt-3" variant="danger">
                    Login to write a review
                  </Alert>
                )}

                <Form noValidate onSubmit={handleWriteReview}>
                  <Form.Label className="fw-bold">Write a review</Form.Label>

                  <Form.Control
                    disabled={userInfo && !userInfo._id}
                    as="textarea"
                    rows={3}
                    name="comment"
                  />

                  <Form.Select
                    disabled={userInfo && !userInfo._id}
                    className="my-2"
                    name="rating"
                  >
                    <option value="your_rating">Your rating</option>

                    <option value="5">5 (very good)</option>

                    <option value="4">4 (good)</option>

                    <option value="3">3 (average)</option>

                    <option value="2">2 (bad)</option>

                    <option value="1">1 (awful)</option>
                  </Form.Select>

                  <Button
                    disabled={userInfo && !userInfo._id}
                    variant="success"
                    type="submit"
                  >
                    Submit review
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <div ref={messageEndRef}></div>
      </Container>
    </>
  );
}

export default ProductDetailPageComponent;
