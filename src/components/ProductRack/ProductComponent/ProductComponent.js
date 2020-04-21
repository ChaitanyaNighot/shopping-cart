import React, { Component } from "react";
import "./ProductComponent.css";

class ProductComponent extends Component {
  getPriceBeforeDecimal(price) {
    let decimalIndex = 0;
    price = price + "";
    decimalIndex = price.indexOf(".");

    if (decimalIndex === -1) {
      return price + "";
    }

    let updatedPrice = price.substr(0, decimalIndex);
    return updatedPrice;
  }

  getPriceAfterDecimal(price) {
    let decimalIndex = 0;
    price = price + "";
    decimalIndex = price.indexOf(".");
    if (decimalIndex === -1) {
      return ".00";
    }
    let updatedPrice = price.substr(decimalIndex, price.length - 1);
    return updatedPrice;
  }

  render() {
    return (
      <div
        className="productComponent"
        onClick={() => this.props.addTocart(this.props.product)}
      >
        {this.props.product.isFreeShipping ? (
          <div className="freeShipping"> Free Shipping </div>
        ) : (
          ""
        )}
        <div>
          <img
            src={require("./images/" + this.props.product.sku + "_1.jpg")}
            alt={this.props.product.title}
          ></img>
        </div>
        <p className="title">{this.props.product.title}</p>

        <div>
          <small>{this.props.product.currencyFormat}</small>
          <span className="price">
            {this.getPriceBeforeDecimal(this.props.product.price)}
          </span>
          <span>{this.getPriceAfterDecimal(this.props.product.price)}</span>
        </div>

        <div className="installment">
          {this.props.product.installments ? (
            <div>
              <span>or {this.props.product.installments} x</span>
              <strong>
                {this.props.product.currencyFormat}
                {(
                  this.props.product.price / this.props.product.installments
                ).toFixed(2)}
              </strong>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="btnAddToCart">Add to Cart</div>
      </div>
    );
  }
}

export default ProductComponent;
