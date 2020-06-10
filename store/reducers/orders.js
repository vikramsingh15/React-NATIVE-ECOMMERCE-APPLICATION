import { ADD_ORDER, FETCH_ORDERS } from '../actions/orders';
import Order from '../../models/orders';

function orders(state = [], action) {
  switch (action.type) {
    case ADD_ORDER:
      let newOrder = new Order(
        action.id,
        action.cartData.cartItems,
        action.cartData.totalAmount,
        action.date
      );
      return state.concat(newOrder);

    case FETCH_ORDERS:
      return action.products;

    default:
      return state;
  }
}

export default orders;
