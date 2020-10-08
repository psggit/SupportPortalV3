import { combineReducers } from "redux";
import { retailerNotesReducer } from "./RetailerDetails";
import { orderInfoReducer } from "./duck";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  retailer: retailerNotesReducer,
});

export { orderReducer };
