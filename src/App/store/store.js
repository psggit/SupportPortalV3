import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { dashboardReducer } from "../containers/Dashboard";
import { homeReducer } from "../containers/OrderDetails";
import { issuesReducer } from "../containers/Issues";
import { cartReducer } from "../containers/Cart";
import { orderReducer } from "../containers/OrderInfo/reducer";
import { cartModifyReducer } from "../containers/CartModification";
import { retailerNotesListReducer } from "../containers/Retailer/RetailerNotes";
import { customerSOAReducer } from "../containers/Customer/CustomerSoa";
import { customerGiftSOAReducer } from "../containers/Customer/CustomerGiftSoa";
import { rewardsReducer } from "../containers/Customer/Rewards";
import { customerUpdateReducer } from "../containers/Customer/CustomerFormDetails";
import { listRetailerReducer } from "../containers/Retailer/ChangeRetailer/duck";
import { logoutReducer } from "../containers/Logout/duck";
import { acitivityListReducer } from "../containers/ActivityList";
import { orderTrackingReducer } from "../containers/OrderTracking";
import { orderModificationReducer } from "../containers/OrderModification";
import { hipcoinSOAReducer } from "../containers/Customer/HipcoinSoa/duck";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    dashboard: dashboardReducer,
    order: orderReducer,
    cart: cartReducer,
    cartModify: cartModifyReducer,
    notes: retailerNotesListReducer,
    soa: customerSOAReducer,
    giftSoa: customerGiftSOAReducer,
    hipcoinSoa: hipcoinSOAReducer,
    rewards: rewardsReducer,
    update: customerUpdateReducer,
    listRetailer: listRetailerReducer,
    logout: logoutReducer,
    acitivityLog: acitivityListReducer,
    issues: issuesReducer,
    orderTracking: orderTrackingReducer,
    orderModify: orderModificationReducer,
  }),
  middleware: [thunk],
});

export default store;
