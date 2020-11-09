import { combineReducers } from "redux";
import { customerReducer } from "./CustomerDetails";
import { retailerNotesReducer } from "./RetailerDetails";
import { deliveryAgentReducer } from "./DeliveryAgent";
import { orderInfoReducer } from "./duck";
import { activityLogReducer } from "./ActivityLogs";
import { orderDataReducer } from "./OrderCard";
import { dspReducer } from "./DeliveryServiceProvider";

const orderReducer = combineReducers({
  orderInfo: orderInfoReducer,
  customer: customerReducer,
  retailer: retailerNotesReducer,
  deliveryAgent: deliveryAgentReducer,
  activityLog: activityLogReducer,
  orderCard: orderDataReducer,
  dsp: dspReducer,
});

export { orderReducer };
