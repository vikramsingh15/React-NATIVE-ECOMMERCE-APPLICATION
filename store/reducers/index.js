import { combineReducers } from 'redux';
import Products from './products';
import Cart from './cart';
import Order from './orders';
import Auth from './auth';

export default combineReducers({
  Products,
  Cart,
  Order,
  Auth
});
