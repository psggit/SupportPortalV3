import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
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
import { acitivityListReducer } from "../containers/ActivityList";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    order: orderReducer,
    cart: cartReducer,
    cartModify: cartModifyReducer,
    notes: retailerNotesListReducer,
    soa: customerSOAReducer,
    giftSoa: customerGiftSOAReducer,
    rewards: rewardsReducer,
    update: customerUpdateReducer,
    listRetailer: listRetailerReducer,
    acitivityLog: acitivityListReducer,
    issues: issuesReducer,
  }),
  middleware: [thunk],
});

export default store;
