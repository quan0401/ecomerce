import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/actions/cartActions";

import ProductDetailPageComponent from "./components/ProductDetailPageComponent";

import { getProductByIdApi } from "../service/productService";

import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

function ProductDetailPage() {
  const [productState, setProductState] = useState(false);

  const {
    userRegisterLogin: { userInfo },
  } = useSelector((state) => state);

  const { id: productId } = useParams();

  const dispatch = useDispatch();

  const addToCartHandler = (productId, quantity) => {
    dispatch(addToCart(productId, quantity));
  };

  const [product, setProduct] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    getProductByIdApi(productId, abortController)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      abortController.abort();
    };
  }, [productId, productState]);

  return (
    <>
      {product && (
        <ProductDetailPageComponent
          addToCartRedux={addToCartHandler}
          getProductByIdApi={getProductByIdApi}
          reduxDispatch={dispatch}
          userInfo={userInfo}
          product={product}
          setProductState={setProductState}
        />
      )}
    </>
  );
}

export default ProductDetailPage;
