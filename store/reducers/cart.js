import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import Cart from '../../models/CartItem';
import { ADD_ORDER } from '../actions/orders';

let INITIAL_STATE = {
  items: {},
  totalAmount: 0
};

function cart(state = INITIAL_STATE, action) {
  let { items } = state;
  let { product, type, pId } = action;
  let newOrUpdateProd;

  switch (type) {
    case ADD_TO_CART:
      //check whether item exists in state
      let item = items[product.id];

      if (item) {
        //yes
        newOrUpdateProd = { ...item };
        //add qty
        newOrUpdateProd.quantity += 1;
        //add price
        newOrUpdateProd.sum += item.productPrice;
      } else {
        let { price, title, id } = product;
        //add new product
        newOrUpdateProd = new Cart(1, price, title, price, id);
      }

      //add totalAmount;
      return {
        ...state,
        items: { ...state.items, [newOrUpdateProd.id]: newOrUpdateProd },
        totalAmount: state.totalAmount + product.price
      };

    case REMOVE_FROM_CART:
      let cartItem = items[pId];
      let updatedItems;
      if (cartItem.quantity > 1) {
        newOrUpdateProd = { ...cartItem };
        newOrUpdateProd.quantity -= 1;
        newOrUpdateProd.sum -= cartItem.productPrice;
        updatedItems = { ...items, [pId]: newOrUpdateProd };
      } else {
        updatedItems = { ...items };
        delete updatedItems[pId];
      }

      return {
        ...state,
        items: { ...updatedItems },
        totalAmount: state.totalAmount - cartItem.productPrice
      };
    case ADD_ORDER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default cart;
