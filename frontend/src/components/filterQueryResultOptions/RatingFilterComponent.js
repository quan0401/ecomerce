import { Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

function RatingFilterComponent({ rating, setRating }) {
  return (
    <>
      <Form>
        <Form.Label className="fw-bold">Rating: </Form.Label>
        <br />
        {Array.from({ length: 5 }).map((item, index) => (
          <div key={index} className="d-flex align-items-center">
            <Form.Check
              onChange={(e) => {
                setRating((prev) => ({
                  ...prev,
                  [e.target.value]: e.target.checked,
                }));
              }}
              className="me-1"
              value={5 - index}
              type={"checkbox"}
            />
            <Rating
              initialValue={5 - index}
              size={"24px"}
              readonly
              style={{ marginTop: "-3px" }}
            />
          </div>
        ))}
      </Form>
    </>
  );
}

export default RatingFilterComponent;
