import Carousel from "react-bootstrap/Carousel";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useRef, useState } from "react";

function ProductCarouselComponent({ bestseller = [] }) {
  const [currentItemLink, setCurrentItemLink] = useState(bestseller[0]?._id);

  const linkRef = useRef(null);
  const clickProduct = (e) => {
    if (linkRef.current) linkRef.current.click();
  };
  useEffect(() => {
    setCurrentItemLink(bestseller[0]?._id);
  }, [bestseller.length]);
  return (
    <Carousel
      onSlid={(e) => setCurrentItemLink(bestseller[e]?._id)}
      variant="dark"
      style={{ overflow: "hidden", cursor: "pointer" }}
    >
      {bestseller.length > 0 &&
        bestseller.map((item, index) => (
          <Carousel.Item style={{ height: "50vh" }} key={index}>
            <div
              onClick={clickProduct}
              className="d-flex align-items-center justify-content-center"
              style={{ height: "80%", marginTop: "-30px" }}
            >
              <img
                style={{
                  objectFit: "cover",
                  maxWidth: "80vw",
                  maxHeight: "90%",
                }}
                src={item.images.length > 0 ? item.images[0].url : ""}
                alt={index + " slide"}
              />
            </div>

            <LinkContainer
              // className="d-none"
              to={"/product-detail/" + currentItemLink}
              style={{ cursor: "pointer" }}
            >
              {/* <Carousel.Caption> */}
              <div ref={linkRef} className="text-center">
                <b>{item.name}</b>
                <div>{item.description}</div>
              </div>
              {/* </Carousel.Caption> */}
            </LinkContainer>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ProductCarouselComponent;
