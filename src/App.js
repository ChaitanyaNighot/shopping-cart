import React from "react";
import ProductRack from "../src/components/ProductRack/ProductRack";
import Filter from "../src/components/Filter/Filter";
import Cart from "../src/components/Cart/Cart";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Filter></Filter>
        <ProductRack></ProductRack>
        <Cart></Cart>
      </div>
    </React.Fragment>
  );
}

export default App;
