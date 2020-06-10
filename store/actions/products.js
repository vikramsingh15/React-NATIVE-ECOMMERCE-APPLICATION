export const DELETE_ORDER = 'DELETE_ORDER';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
import Product from '../../models/Products';
import axios from 'axios';

export const deleteProduct = pId => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    await fetch(
      `https://shop-rn-app-3bc17.firebaseio.com/products/${pId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    dispatch({
      type: DELETE_ORDER,
      pId
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // await axios.get('htttps://google.com');
    let response = await axios.get(
      'https://shop-rn-app-3bc17.firebaseio.com/products.json'
    );

    response = await response.data;
    const loadedProducts = [];
    const userId = getState().Auth.userId;

    for (const key in response) {
      loadedProducts.push(
        new Product(
          key,
          response[key].ownerId,
          response[key].title,
          response[key].imageUrl,
          response[key].description,
          response[key].price
        )
      );
    }

    dispatch({
      type: FETCH_PRODUCTS,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
    });
  };
};

export const addProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    let userId = getState().Auth.userId;
    console.log(token);
    let response = await fetch(
      `https://shop-rn-app-3bc17.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        })
      }
    );

    if (!response.ok) {
      // console.log(response);
      throw new Error('Something went wrong!');
    }
    response = await response.json();
    // console.log(response);

    dispatch({
      type: ADD_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price,
        id: response.name,
        ownerId: userId
      }
    });
  };
};

export const editProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    let token = getState().Auth.token;
    let response = await fetch(
      `https://shop-rn-app-3bc17.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: EDIT_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        id
      }
    });
  };
};
