import { combineReducers } from "redux";
import { customerReducer } from "./CustomerDetails";
import { retailerNotesReducer } from "./RetailerDetails";
import { deliveryAgentReducer } from "./DeliveryAgent";
import { orderInfoReducer } from "./duck";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  customer: customerReducer,
  retailer: retailerNotesReducer,
  deliveryAgent: deliveryAgentReducer,
});

export { orderReducer };
