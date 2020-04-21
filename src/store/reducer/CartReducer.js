import * as actionTypes from "../actions";

const initialState = {
  cartItems: [],
  subTotal: 0.0,
};

const addItemToCart = (state, cart_item) => {
  //while adding item in cart, first need to check if the
  //item already exists in the cart.
  let available_cart_item = state.cartItems.find(
    (item) => cart_item.id === item.id
  );

  if (available_cart_item == undefined) {
    //if do not exist then add it in the list and return.
    cart_item.quantity = 1;
    state.cartItems.push(cart_item);
    state.subTotal = state.subTotal + cart_item.price;
  } else {
    //if already exists then increment qty
    available_cart_item.quantity = ++available_cart_item.quantity;
    state.subTotal = state.subTotal + cart_item.price;
  }

  return state;
};

const removeItemFromCart = (state, ItemId) => {
  //need to check if the item is there in the cart or not.
  let cart_item_index = state.cartItems.findIndex((item) => ItemId === item.id);

  if (cart_item_index === -1) {
    //if it is not there in the cart the return current state
    return state;
  } else {
    let cart_item = state.cartItems[cart_item_index];

    state.subTotal = state.subTotal - cart_item.price * cart_item.quantity;
    //if available in array then remove it.
    state.cartItems.splice(cart_item_index, 1);
  }

  return state;
};

const incQuantity = (state = initialState, ItemId) => {
  //to increment quantity , item must be in cart.
  let available_cart_item = state.cartItems.find((item) => ItemId === item.id);

  if (available_cart_item == undefined) {
    return state;
  } else {
    //if already exists then increment qty
    available_cart_item.quantity = ++available_cart_item.quantity;
    state.subTotal = state.subTotal + available_cart_item.price;
  }

  return state;
};

const decQuantity = (state = initialState, ItemId) => {
  let available_cart_item = state.cartItems.find((item) => ItemId === item.id);

  if (available_cart_item == undefined) {
    return state;
  } else {
    //if quantity is greater then 1 then only decrement
    if (available_cart_item.quantity > 1) {
      available_cart_item.quantity = --available_cart_item.quantity;

      state.subTotal = state.subTotal - available_cart_item.price;
    }
  }

  return state;
};

const Cartreducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      let updatedstate = addItemToCart(state, action.cartItem);
      return {
        ...updatedstate,
      };

    case actionTypes.REMOVE_CART_ITEM:
      return removeItemFromCart(state, action.ItemId);

    case actionTypes.INC_QUANTITY:
      return incQuantity(state, action.ItemId);

    case actionTypes.DEC_QUANTITY:
      return decQuantity(state, action.ItemId);

    default:
      return state;
  }
};

export default Cartreducer;
