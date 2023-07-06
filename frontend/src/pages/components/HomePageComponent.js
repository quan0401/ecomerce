import CategoryCardComponent from "../../components/CategoryCardComponent";
import MetaComponent from "../../components/MetaComponent";
import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import { useEffect, useState } from "react";

import { Container, Row } from "react-bootstrap";

function HomePageComponent({ categories, getBestsellerApi }) {
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    getBestsellerApi()
      .then((res) => {
        setBestseller(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <MetaComponent />
      <ProductCarouselComponent bestseller={bestseller} />
      <Container className="mt-4">
        <Row xs={1} md={2} className="g-3">
          {categories &&
            categories.map((category, index) => (
              <CategoryCardComponent
                key={index}
                category={category}
                index={index}
              />
            ))}
        </Row>
      </Container>
    </>
  );
}

export default HomePageComponent;
