import { useDispatch, useSelector } from "react-redux";

import {
  getProductByIdApi,
  updateProductApi,
  deleteProductImage,
} from "../../service/productService";

import { useParams } from "react-router-dom";

import AdminEditProductPageComponent from "./components/AdminEditProductPageComponent";
import {
  createNewAttrForCate,
  deleteCategoryAction,
} from "../../redux/actions/categoryActions";

import { uploadImageApi } from "../../service/productService";

import { useEffect, useState } from "react";

function AdminEditProductPage() {
  const dispatch = useDispatch();

  const [reloadProduct, setReloadProduct] = useState(false);

  const [deleteImage, setDeleteImage] = useState(false);

  const { id: productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductByIdApi(productId)
      .then((res) => {
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId, deleteImage, reloadProduct]);

  const deleteImageHandler = async (imagePath, productId) => {
    const result = await deleteProductImage(productId, imagePath);
    setDeleteImage((prev) => !prev);
  };

  const { categories } = useSelector((state) => state.category);

  return (
    <>
      {product && (
        <AdminEditProductPageComponent
          categories={categories}
          getProductByIdApi={getProductByIdApi}
          product={product}
          updateProductApi={updateProductApi}
          reduxDispatch={dispatch}
          createNewAttrForCate={createNewAttrForCate}
          deleteProductImageHandler={deleteImageHandler}
          uploadImageApi={uploadImageApi}
          setReloadProduct={setReloadProduct}
          deleteCategoryAction={deleteCategoryAction}
        />
      )}
    </>
  );
}

export default AdminEditProductPage;
