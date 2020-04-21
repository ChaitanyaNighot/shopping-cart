import React, { Component } from "react";
import FilterItem from "./FilterItem/FilterItem";
import "./Filter.css";
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

const availableSizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

class Filter extends Component {
  createAllCheckBoxes = () => {
    debugger;
    availableSizes.map(this.createSingleCheckBox);
  };

  createSingleCheckBox = (Availablesize) => (
    <FilterItem size={Availablesize}></FilterItem>
  );

  render() {
    //debugger;

    let checkboxes = availableSizes.map((Availablesize) => (
      <FilterItem
        size={Availablesize}
        addFilter={this.props.addFilter}
      ></FilterItem>
    ));

    //this.createAllCheckBoxes();

    return (
      <div className="Filter">
        <h5 className="title">Sizes:</h5>

        {checkboxes}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //productsToDisplayInRack will contain list of items to be displayed in the Rack.
    productsToDisplayInRack: state.productRackReducer.products,
    filteredProducts: state.productRackReducer.filteredProducts,
  };
};

const mapdispatchToProps = (dispatch) => {
  return {
    addFilter: (object) => {
      if (object.addFilter) {
        dispatch({ type: actionTypes.ADD_FILTER, ProductSize: object.size });
      } else {
        dispatch({ type: actionTypes.REMOVE_FILTER, ProductSize: object.size });
      }
    },
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(Filter);
