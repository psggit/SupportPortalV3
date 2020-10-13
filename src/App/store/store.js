import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { cartReducer } from "../containers/Cart";
import { orderReducer } from "../containers/OrderInfo/reducer";
import { retailerNotesListReducer } from "../containers/Retailer/RetailerNotes";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    order: orderReducer,
    cart: cartReducer,
    notes: retailerNotesListReducer,
  }),
  middleware: [thunk],
});

export default store;
