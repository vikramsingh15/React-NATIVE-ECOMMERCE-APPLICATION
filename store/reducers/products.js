import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_ORDER,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  FETCH_PRODUCTS
} from '../actions/products';
import Product from '../../models/Products';

let INITIAL_STATE = {
  availableProducts: [],
  userProducts: [],
  loading: true
};

function products(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
        loading: false
      };

    case DELETE_ORDER:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pId
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.pId
        )
      };

    case ADD_PRODUCT:
      let product = new Product(
        action.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(product),
        userProducts: state.userProducts.concat(product),
        loading: false
      };

    case EDIT_PRODUCT:
      let availableProdIndex = state.availableProducts.findIndex(
        product => product.id === action.productData.id
      );
      let userProdIndex = state.userProducts.findIndex(
        product => product.id === action.productData.id
      );

      let editedProd = new Product(
        action.productData.id,
        state.userProducts[availableProdIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[availableProdIndex].price
      );

      let updatedAvailableProd = [...state.availableProducts];
      let updatedUserProd = [...state.userProducts];
      updatedAvailableProd[availableProdIndex] = editedProd;
      updatedUserProd[userProdIndex] = editedProd;

      return {
        ...state,
        availableProducts: updatedAvailableProd,
        userProducts: updatedUserProd,
        loading: false
      };
    default:
      return state;
  }
}

export default products;
