import React, { Component } from "react";
import "./ProductRackHeader.css";
import * as actionTypes from "../../../store/actions.js";

class ProductRackHeader extends Component {
  render() {
    return (
      <div className="productHeader">
        <span className="productCountLabel">
          {this.props.productCount} Product(s) found.
        </span>

        <div className="sortProduct">
          <select
            onChange={(event) => {
              let value;

              if (event.target.value === "select") {
                value = actionTypes.SELECT;
              } else if (event.target.value === "lowToHigh") {
                value = actionTypes.LOWEST_TO_HIGHEST;
              } else if (event.target.value === "highToLow") {
                value = actionTypes.HIGHEST_TO_LOWEST;
              }
              this.props.sortBy(value);
            }}
          >
            <option value="select">Select</option>
            <option value="lowToHigh">Lowest to highest</option>
            <option value="highToLow">Highest to lowest</option>
          </select>
        </div>
      </div>
    );
  }
}

export default ProductRackHeader;
