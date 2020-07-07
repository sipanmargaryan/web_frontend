import * as types from '../constants/actionTypes';
import  apiCall from '../services/apiCall';

export const getProduct = () => {
  return (dispatch) => {
    return apiCall({
      url: `${process.env.REACT_APP_TEST_API}/product/products/`,
      dispatch:dispatch,
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      types: [types.GET_PRODUCTS_REQUEST, types.GET_PRODUCTS_SUCCESS, types.GET_PRODUCTS_FAILURE],
    });
  };
};

export const payForProduct = (billingDetails) => {
  return (dispatch) => {
    return apiCall({
      url: `${process.env.REACT_APP_TEST_API}/payment/charge/`,
      dispatch:dispatch,
      method: 'post',
      data: JSON.stringify(billingDetails),
      headers: {'Content-Type': 'application/json'},
      types: [types.PAY_PRODUCT_REQUEST, types.PAY_PRODUCT_SUCCESS, types.PAY_PRODUCT_FAILURE],
    });
  };
};

export const addBasket = (product) => (
  {
    type: types.ADD_PRODUCT,
    payload: product
  }
);