import React, { Component } from "react";
import "./CartItem.css";

class CartItem extends Component {
  render() {
    return (
      <div className="cart_item">
        <div
          className="delete_cart_item"
          onClick={() => this.props.removeFromCart(this.props.product.id)}
        ></div>
        <div className="cart_item_image">
          <img
            src={require("../../../ProductRack/ProductComponent/images/" +
              this.props.product.sku +
              "_1.jpg")}
          ></img>
        </div>
        <div className="cart_item_details">
          <p className="cart_item_title">{this.props.product.title}</p>
          <p className="item_description">
            {this.props.product.availableSizes[0] +
              " | " +
              this.props.product.style}
            <br />
            {"Quantity:" + this.props.product.quantity}
          </p>
        </div>
        <div className="cart_item_price">
          <p className="label_price">
            {this.props.product.currencyFormat + " " + this.props.product.price}
          </p>
          <br></br>
          <button
            className="btn_update_product_qty"
            onClick={() => this.props.decItemQuantity(this.props.product.id)}
          >
            -
          </button>
          <button
            className="btn_update_product_qty"
            onClick={() => this.props.incItemQuantity(this.props.product.id)}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default CartItem;
