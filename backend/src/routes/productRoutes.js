const express = require("express");

const {
  getProducts,
  getProductById,
  getBestseller,
  adminGetProdcts,
  adminDeleteProduct,
  adminCreateProduct,
  adminDeleteAll,
  adminUpdateProduct,
  adminUploadFile,
  adminDeleteProductImage,
} = require("../controller/productController");

const {
  verifyAdmin,
  verifyIsLoggedIn,
} = require("../middleware/verifyAuthToken");

const productRoutes = express.Router();

productRoutes.get("/", getProducts);

productRoutes.get("/category/:categoryName", getProducts);

productRoutes.get("/category/:categoryName/search/:searchQuery", getProducts);

productRoutes.get("/search/:searchQuery", getProducts);

productRoutes.get("/bestseller", getBestseller);

productRoutes.get("/get-one/:id", getProductById);

// Admin Routes
productRoutes.use(verifyIsLoggedIn, verifyAdmin);

productRoutes.get("/admin", adminGetProdcts);

productRoutes.delete("/admin/:id", adminDeleteProduct);

productRoutes.post("/admin", adminCreateProduct);

productRoutes.put("/admin/:id", adminUpdateProduct);

productRoutes.post("/admin/upload", adminUploadFile);

productRoutes.delete(
  "/admin/image/:imagePath/:productId",
  adminDeleteProductImage
);

productRoutes.delete("/admin/delete/:name", adminDeleteAll);

module.exports = productRoutes;
