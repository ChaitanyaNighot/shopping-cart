import React, { Component } from "react";
import "./CartContent.css";
import CartItem from "./CartItem/CartItem";
//import { connect } from "react-redux";
//import * as actionTypes from "../../../store/actions";

class CartContent extends Component {
  render() {
    let CartItems = this.props.cartItems.map((cartItem) => (
      <CartItem
        product={cartItem}
        incItemQuantity={this.props.incItemQuantity}
        decItemQuantity={this.props.decItemQuantity}
        removeFromCart={this.props.removeFromCart}
      ></CartItem>
    ));

    return <div className="cart_content">{CartItems}</div>;
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cartReducer.cartItems,
//     // subtotal: state.cartReducer.subtotal,
//   };
// };

// const mapdispatchToProps = (dispatch) => {
//   return {
//     incItemQuantity: (ItemId) =>
//       dispatch({ type: actionTypes.INC_QUANTITY, ItemId: ItemId }),

//     decItemQuantity: (ItemId) =>
//       dispatch({ type: actionTypes.DEC_QUANTITY, ItemId: ItemId }),

//     removeFromCart: (ItemId) =>
//       dispatch({ type: actionTypes.REMOVE_CART_ITEM, ItemId: ItemId }),
//   };
// };

// export default connect(mapStateToProps, mapdispatchToProps)(CartContent);

export default CartContent;
