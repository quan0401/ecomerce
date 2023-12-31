const Category = require("../models/CategoryModel");

const getAllController = async (req, res, next) => {
  try {
    const result = await Category.find().sort({ name: "asc" }).orFail();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const newCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name)
      res.status(400).send({ EM: "Category input is required", EC: 1 });

    const isExisted = await Category.findOne({ name });

    if (isExisted) {
      res.status(400).send({ EM: "This category is existed", EC: 1 });
    } else {
      const newCategory = await Category.create({ name });

      res.status(201).send({ newCategory, EC: 0 });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (!category)
      res.status(400).send({ EM: "Category is required to delete", EC: 1 });

    const isExisted = await Category.findOne({
      name: decodeURIComponent(category),
    }).orFail();

    const deletedCategory = await isExisted.deleteOne();

    res.status(200).send({ deletedCategory, EC: 0 });
  } catch (error) {
    next(error);
  }
};

const saveAttributeController = async (req, res, next) => {
  try {
    const { key, value, categoryChosen } = req.body;

    const category = categoryChosen.split("/")[0];

    if (!key || !value || !categoryChosen)
      res.status(400).send("All inputs are required to create new attribute!");

    const categoryExists = await Category.findOne({ name: category }).orFail();

    let attrNotExist = true;

    categoryExists.attributes.forEach((attr, index) => {
      if (attr.key === key) {
        attrNotExist = false;
        attr.value = [...new Set([...attr.value, value])];
      }
    });

    if (attrNotExist) categoryExists.attributes.push({ key, value });

    await categoryExists.save();

    const updatedCategory = await Category.find().sort({ name: "asc" });

    res.status(201).json({ updatedCategory });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllController,
  newCategoryController,
  deleteCategoryController,
  saveAttributeController,
};
