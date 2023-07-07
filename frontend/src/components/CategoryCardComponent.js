import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const images = [
  "images/img1.jpeg",
  "images/img2.JPG",
  "images/img3.jpeg",
  "images/img4.jpeg",
  "images/img6.jpg",
  "images/img4.jpeg",
  "images/img6.jpg",
];

const defaultCategory = {
  name: "All products",
  description: "",
  image:
    "https://res.cloudinary.com/dg3fsapzu/image/upload/v1688709996/edpaj6amcog79qspwdwq.jpg",
};

function CategoryCardComponent({ category = defaultCategory, index }) {
  return (
    <Card>
      <Link
        to={
          category.name === defaultCategory.name
            ? "/product-list/"
            : "/product-list/category/" + category.name.replace("/", ",")
        }
      >
        <Card.Img
          style={{
            height: "400px",
            objectFit: "cover",
            objectPosition: "center",
          }}
          variant="top"
          src={category.image || images[index]}
        />

        <Card.Body className="text-black">
          <Card.Title
            className={
              category.name === defaultCategory.name ? "text-center" : ""
            }
          >
            {category.name}
          </Card.Title>

          <Card.Text>{category.description}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Link>
    </Card>
  );
}

export default CategoryCardComponent;
