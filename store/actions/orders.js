export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';
import Order from '../../models/orders';
import axios from 'axios';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    let userId = getState().Auth.userId;
    let response = await axios.get(
      `https://shop-rn-app-3bc17.firebaseio.com/orders/${userId}.json`
    );

    response = response.data;
    const loadedProducts = [];

    for (const key in response) {
      // console.log(key);
      loadedProducts.push(
        new Order(
          key,
          response[key].cartItems,
          response[key].totalAmount,
          response[key].date
        )
      );
    }
    // console.log(loadedProducts);
    dispatch({
      type: FETCH_ORDERS,
      products: loadedProducts
    });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    let userId = getState().Auth.userId;
    let token = getState().Auth.token;
    let date = new Date();
    console.log(userId, 'scd');
    const response = await fetch(
      `https://shop-rn-app-3bc17.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    return dispatch({
      type: ADD_ORDER,
      cartData: { cartItems, totalAmount, id: resData.name, date }
    });
  };
};
