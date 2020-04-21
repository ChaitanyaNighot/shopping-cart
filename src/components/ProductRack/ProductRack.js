import React, { Component } from "react";
import ProductRackHeader from "./ProductRackHeader/ProductRackHeader";
import "./ProductRack.css";
import ProductComponent from "./ProductComponent/ProductComponent";
import axios from "axios";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class ProductRack extends Component {
  //this function will be called after the component is rendered on UI
  componentDidMount() {
    axios
      .get("https://react-shopping-cart-67954.firebaseio.com/products.json")
      .then((response) => {
        this.props.updateStateWithFetchedProducts(response.data);
        //console.log(response);
      });
    //.catch();
  }

  render() {
    let ProdList;
    if (this.props.filteredProducts.length > 0) {
      ProdList = this.props.filteredProducts;
    } else if (this.props.sortedProducts.length > 0) {
      ProdList = this.props.sortedProducts;
    } else {
      ProdList = this.props.productsToDisplayInRack;
    }

    let ProductComponentList = ProdList.map((product) => (
      <ProductComponent
        product={product}
        addTocart={this.props.addTocart}
      ></ProductComponent>
    ));

    return (
      <div className="ProductRack">
        <ProductRackHeader
          productCount={ProdList.length}
          sortBy={this.props.sortBy}
        ></ProductRackHeader>
        {ProductComponentList}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //productsToDisplayInRack will contain list of items to be displayed in the Rack.
    productsToDisplayInRack: state.productRackReducer.products,
    filteredProducts: state.productRackReducer.filteredProducts,
    sortedProducts: state.productRackReducer.sortedProducts,
    cartItems: state.cartReducer.cartItems,
    subTotal: state.cartReducer.subTotal,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    updateStateWithFetchedProducts: (products) =>
      dispatch({ type: actionTypes.SAVE_PRODUCTS, products: products }),

    sortBy: (sortByAction) => dispatch({ type: sortByAction }),

    addTocart: (product) =>
      dispatch({ type: actionTypes.ADD_CART_ITEM, cartItem: product }),
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(ProductRack);
