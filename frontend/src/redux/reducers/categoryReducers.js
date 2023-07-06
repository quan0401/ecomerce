import {
  GET_CATEGORIES,
  CREATE_NEW_ATTR_FOR_CATE,
  INSERT_NEW_CATEGORY,
  DELETE_CATEGORY,
} from "../constants/categoryConstants";

const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case CREATE_NEW_ATTR_FOR_CATE: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case INSERT_NEW_CATEGORY: {
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    }
    case DELETE_CATEGORY: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;
