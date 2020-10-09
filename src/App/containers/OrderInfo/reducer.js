import { combineReducers } from "redux";
import { customerReducer } from "./CustomerDetails";
import { orderInfoReducer } from "./duck";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  customer: customerReducer,
});

export { orderReducer };
