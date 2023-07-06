import ProductListPageComponent from "./components/ProductListPageComponent";

import { getProductsApi } from "../service/productService";

import { useSelector } from "react-redux";

function ProductListPage() {
  const { categories } = useSelector((state) => state.category);

  return (
    <ProductListPageComponent
      getProductsApi={getProductsApi}
      categories={categories}
    />
  );
}

export default ProductListPage;
