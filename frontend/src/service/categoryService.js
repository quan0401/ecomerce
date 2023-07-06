import instance from "../axios/setup";

export const getCategories = async () => await instance.get("/api/categories");

export const createNewAttrForCateApi = async (key, value, categoryChosen) =>
  await instance.post("/api/categories/attribute", {
    key,
    value,
    categoryChosen,
  });

export const createCategoryService = async (name) =>
  await instance.post("/api/categories/", { name });

export const deleteCategoryService = async (name) =>
  await instance.delete("/api/categories/" + encodeURIComponent(name));
