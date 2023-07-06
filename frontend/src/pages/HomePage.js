import HomePageComponent from "./components/HomePageComponent";
import { useSelector } from "react-redux";
import { getBestsellerApi } from "../service/productService";

function HomePage() {
  const { categories } = useSelector((state) => state.category);

  return (
    <>
      <HomePageComponent
        categories={categories}
        getBestsellerApi={getBestsellerApi}
      />
    </>
  );
}

export default HomePage;
