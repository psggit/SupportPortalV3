import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { cartReducer } from "../containers/Cart";
import { orderReducer } from "../containers/OrderInfo/reducer";
import { customerSOAReducer } from "../containers/Customer/CustomerSoa";
//import { customerUpdate } from "../containers/Customer/CustomerFormDetails";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    order: orderReducer,
    cart: cartReducer,
    soa: customerSOAReducer,
    //consumerUpdate: customerUpdate,
  }),
  middleware: [thunk],
});

export default store;
