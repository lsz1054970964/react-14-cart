import {
  ClearCart,
  Remove,
  Increase,
  Decrease,
  Loading,
  Display,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === ClearCart) {
    return { ...state, cart: new Map() };
  }

  if (action.type === Remove) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payLoad.id);
    return { ...state, cart: newCart };
  }

  if (action.type === Increase) {
    const newCart = new Map(state.cart);
    const itemId = action.payLoad.id;
    const item = newCart.get(itemId);
    const newItem = { ...item, amount: item.amount + 1 };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === Decrease) {
    const newCart = new Map(state.cart);
    const itemId = action.payLoad.id;
    const item = newCart.get(itemId);
    if ((item.amount = 1)) {
      newCart.delete(itemId);
      return { ...state, cart: newCart };
    }
    const newItem = { ...item, amount: item.amount - 1 };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === Loading) {
    return { ...state, loading: true };
  }

  if (action.type === Display) {
    const newCart = new Map(action.payLoad.data.map((item) => [item.id, item]));
    return { ...state, cart: newCart, loading: false };
  }

  throw new Error(`no matching action type: ${action.type}`);
};

export default reducer;
