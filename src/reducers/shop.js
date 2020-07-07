import * as types from '../constants/actionTypes';

const initialState = {
  basket: [],
  products: [],
  success: '',
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.PAY_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload
      };
    case types.ADD_PRODUCT:
      return {
        ...state,
        basket: [...state.basket, payload,]
      };
    case types.PAY_PRODUCT_SUCCESS:
      return {
        ...state,
        success: payload,
        loading: false,
      };
    case types.PAY_PRODUCT_FAILURE:
      console.log(payload)
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
