import React, { Component } from "react";
import "./FilterItem.css";

class FilterItem extends Component {
  state = {
    isClicked: false,
  };

  render() {
    return (
      <div
        className={
          "filterItem" +
          (this.state.isClicked === true ? " filterItemClicked" : "")
        }
        onClick={() => {
          this.setState({ isClicked: !this.state.isClicked });
          this.props.addFilter({
            size: this.props.size,
            addFilter: !this.state.isClicked,
          });
        }}
      >
        {<span className="filterLabel">{this.props.size}</span>}
      </div>
    );
  }
}

export default FilterItem;
