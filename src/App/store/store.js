import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { cartReducer } from "../containers/Cart";
import { orderReducer } from "../containers/OrderInfo/reducer";
import { cartModifyReducer } from "../containers/CartModification";
import { retailerNotesListReducer } from "../containers/Retailer/RetailerNotes";
import { customerSOAReducer } from "../containers/Customer/CustomerSoa";
import { customerGiftSOAReducer } from "../containers/Customer/CustomerGiftSoa";
import { rewardsReducer } from "../containers/Customer/Rewards";
import { customerUpdateReducer } from "../containers/Customer/CustomerFormDetails";

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
  }),
  middleware: [thunk],
});

export default store;
