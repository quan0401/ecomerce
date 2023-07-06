import * as actionTypes from "../constants/cartConstants";

const localStorageCart = JSON.parse(localStorage.getItem("cart"));

const CART_INIT_STATE = {
  cartItems: localStorageCart?.cartItems || [],
  itemsCount: localStorageCart?.itemsCount || 0,
  cartSubtotal: localStorageCart?.cartSubtotal || 0,
};

export const cartReducer = (state = CART_INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const { payload } = action;

      const newState = { ...state };

      const productAlreadyExistsInState = newState.cartItems.find(
        (item) => item.productId === payload.productId
      );

      if (!productAlreadyExistsInState) {
        delete payload.changeQuantiy;

        newState.cartItems.push(payload);

        newState.itemsCount += +payload.quantity;

        newState.cartSubtotal += +payload.quantity * +payload.price;
      } else if (!payload.changeQuantiy) {
        productAlreadyExistsInState.quantity += +payload.quantity;

        newState.itemsCount += +payload.quantity;

        newState.cartSubtotal += +payload.quantity * +payload.price;
      } else {
        // Change the quantiy and re-calculate
        productAlreadyExistsInState.quantity = +payload.quantity;

        newState.itemsCount = 0;

        newState.cartSubtotal = newState.cartItems.reduce(
          (acc, currentValue) => {
            newState.itemsCount += currentValue.quantity;

            return acc + currentValue.quantity * currentValue.price;
          },
          0
        );
      }

      return newState;
    }
    case actionTypes.REMOVE_FROM_CART: {
      const { productId, quantity, price } = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== productId
        ),
        itemsCount: state.itemsCount - quantity,
        cartSubtotal: state.cartSubtotal - quantity * price,
      };
    }
    default:
      return state;
  }
};
