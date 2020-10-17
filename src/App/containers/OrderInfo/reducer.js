import { combineReducers } from "redux";
import { customerReducer } from "./CustomerDetails";
import { retailerNotesReducer } from "./RetailerDetails";
import { deliveryAgentReducer } from "./DeliveryAgent";
import { orderInfoReducer } from "./duck";
import { activityLogReducer } from "./ActivityLogs";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  customer: customerReducer,
  retailer: retailerNotesReducer,
  deliveryAgent: deliveryAgentReducer,
  activityLog: activityLogReducer,
});

export { orderReducer };
