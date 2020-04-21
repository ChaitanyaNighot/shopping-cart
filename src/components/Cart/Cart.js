import React, { Component } from "react";
import "./Cart.css";
import CartContent from "../Cart/CartContent/CartContent";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class Cart extends Component {
  state = {
    isCartOpened: false,
  };

  btnCheckOut = () => {
    let subtotal = this.props.subtotal;
    if (subtotal === 0.0) {
      alert("Add some items to cart.");
    } else {
      alert("Checkout - Subtotal $ " + subtotal);
    }
  };

  render() {
    let cartIcon = "";

    if (this.state.isCartOpened === false) {
      cartIcon = (
        <span
          className="cart_bag cart_bag_cart_closed"
          onClick={() =>
            this.setState({ isCartOpened: !this.state.isCartOpened })
          }
        >
          <span className="cart_count">{this.props.cartItems.length}</span>
        </span>
      );
    } else {
      cartIcon = (
        <div
          className="cart_bag_cart_opened"
          onClick={() =>
            this.setState({ isCartOpened: !this.state.isCartOpened })
          }
        ></div>
      );
    }

    return (
      <div className={"cart" + (this.state.isCartOpened ? " cart_opened" : "")}>
        {cartIcon}
        <div className="cart_container">
          <div className="cart_header">
            <span className="cart_bag">
              <span className="cart_count">{this.props.cartItems.length}</span>
            </span>
            <span className="cart_title">Cart</span>
          </div>
          {this.props.cartItems.length === 0 ? (
            <p>Add some products in cart.</p>
          ) : (
            <CartContent
              cartItems={this.props.cartItems}
              incItemQuantity={this.props.incItemQuantity}
              decItemQuantity={this.props.decItemQuantity}
              removeFromCart={this.props.removeFromCart}
            ></CartContent>
          )}
          <div className="cart_footer">
            <div className="subtotal">SUBTOTAL</div>
            <div className="subtotal_cost">
              <p>{"$ " + this.props.subtotal.toFixed(2)}</p>
            </div>
            <button className="btnCheckout" onClick={() => this.btnCheckOut()}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducer.cartItems,
    subtotal: state.cartReducer.subTotal,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    incItemQuantity: (ItemId) =>
      dispatch({ type: actionTypes.INC_QUANTITY, ItemId: ItemId }),

    decItemQuantity: (ItemId) =>
      dispatch({ type: actionTypes.DEC_QUANTITY, ItemId: ItemId }),

    removeFromCart: (ItemId) =>
      dispatch({ type: actionTypes.REMOVE_CART_ITEM, ItemId: ItemId }),
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(Cart);
