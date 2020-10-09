import { combineReducers } from "redux";
import { retailerNotesReducer } from "./RetailerDetails";
import { deliveryAgentReducer } from "./DeliveryAgent";
import { orderInfoReducer } from "./duck";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  retailer: retailerNotesReducer,
  deliveryAgent: deliveryAgentReducer,
});

export { orderReducer };
