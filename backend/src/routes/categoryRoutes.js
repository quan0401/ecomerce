const express = require("express");
const {
  deleteCategoryController,
  getAllController,
  newCategoryController,
  saveAttributeController,
} = require("../controller/categoryController");

const {
  verifyAdmin,
  verifyIsLoggedIn,
} = require("../middleware/verifyAuthToken");

const router = express.Router();

router.get("/", getAllController);

router.use(verifyIsLoggedIn, verifyAdmin);

router.post("/", newCategoryController);

router.delete("/:category", deleteCategoryController);

router.post("/attribute", saveAttributeController);

module.exports = router;
