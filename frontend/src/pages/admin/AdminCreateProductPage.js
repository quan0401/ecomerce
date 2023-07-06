import AdminCreateProductPageComponent from "./components/AdminCreateProductPageComponent";

import { useDispatch, useSelector } from "react-redux";

import {
  createNewAttrForCate,
  insertCategoryAction,
  deleteCategoryAction,
} from "../../redux/actions/categoryActions";

import { uploadImageApi, createProductApi } from "../../service/productService";

function AdminCreateProductPage() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  return (
    <AdminCreateProductPageComponent
      categories={categories}
      createNewAttrForCate={createNewAttrForCate}
      uploadImageApi={uploadImageApi}
      reduxDispatch={dispatch}
      createProductApi={createProductApi}
      insertCategoryAction={insertCategoryAction}
      deleteCategoryAction={deleteCategoryAction}
    />
  );
}

export default AdminCreateProductPage;
