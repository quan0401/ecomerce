import {
  createCategoryService,
  createNewAttrForCateApi,
  deleteCategoryService,
  getCategories,
} from "../../service/categoryService";

import {
  GET_CATEGORIES,
  CREATE_NEW_ATTR_FOR_CATE,
  INSERT_NEW_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/categoryConstants";

export const getCategoriesAction = () => async (dispatch) => {
  const categories = await getCategories();

  dispatch({
    type: GET_CATEGORIES,
    payload: categories,
  });
};

export const createNewAttrForCate =
  (key, value, categoryChosen) => async (dispatch, getState) => {
    const { updatedCategory: categories } = await createNewAttrForCateApi(
      key,
      value,
      categoryChosen
    );

    dispatch({
      type: CREATE_NEW_ATTR_FOR_CATE,
      payload: categories,
    });
  };

export const insertCategoryAction = (name) => async (dispatch, getState) => {
  const { EC, EM, newCategory } = await createCategoryService(name);

  if (+EC === 0) {
    dispatch({
      type: INSERT_NEW_CATEGORY,
      payload: newCategory,
    });
  }
};

export const deleteCategoryAction = (name) => async (dispatch, getState) => {
  const { deletedCategory, EC } = await deleteCategoryService(
    encodeURIComponent(name)
  );

  const { categories } = getState().category;

  const newCategories = categories.filter((item) => item.name !== name);

  if (EC === 0) {
    dispatch({
      type: DELETE_CATEGORY,
      payload: [...newCategories],
    });
  }
};
