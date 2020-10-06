import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { orderInfoReducer } from "../containers/OrderInfo";
import { cartReducer } from "../containers/Cart";
import { retailerNotesReducer } from "../containers/RetailerDetails/duck"

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    orderInfo: orderInfoReducer,
    cart: cartReducer,
    retailerNotes: retailerNotesReducer,
  }),
  middleware: [thunk],
});

export default store;
