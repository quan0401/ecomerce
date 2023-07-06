import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { userRegisterLoginReducer } from "./reducers/userReducers";
import categoryReducer from "./reducers/categoryReducers";
import adminChatReducer from "./reducers/chatReducer";

const userInfoLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : sessionStorage.getItem("userInfo")
  ? JSON.parse(sessionStorage.getItem("userInfo"))
  : {};

const reducer = combineReducers({
  cart: cartReducer,
  userRegisterLogin: userRegisterLoginReducer,
  category: categoryReducer,
  adminChat: adminChatReducer,
});

const initialValue = {
  // cart: {},
  userRegisterLogin: { userInfo: { ...userInfoLocalStorage } },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialValue,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
