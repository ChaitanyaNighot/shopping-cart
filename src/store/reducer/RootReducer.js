import { combineReducers } from "redux";
import ProductRackReducer from "./ProductRackReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  productRackReducer: ProductRackReducer,
  cartReducer: CartReducer,
});

export default rootReducer;
