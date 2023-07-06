import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const images = [
  "images/img1.jpeg",
  "images/img2.JPG",
  "images/img3.jpeg",
  "images/img4.jpeg",
  "images/img6.jpg",
  "images/img7.png",
];

function CategoryCardComponent({ category, index }) {
  return (
    <Card>
      <Card.Img
        style={{
          height: "400px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        variant="top"
        src={images[index]}
      />

      <Card.Body>
        <Card.Title>{category.name}</Card.Title>

        <Card.Text>{category.description}</Card.Text>
        <Link to={"/product-list/category/" + category.name.replace("/", ",")}>
          <Button variant="primary">Go somewhere</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;
