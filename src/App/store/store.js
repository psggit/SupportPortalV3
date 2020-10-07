import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { orderInfoReducer } from "../containers/OrderInfo";
import { daNotesReducer } from "../containers/DeliveryAgentNotes";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    orderInfo: orderInfoReducer,
    daNotes: daNotesReducer
  }),
  middleware: [thunk],
});

export default store;
