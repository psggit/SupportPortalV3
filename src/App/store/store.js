import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";
import { homeReducer } from "../containers/Dashboard";
import { orderInfoReducer } from "../containers/OrderInfo";

const store = configureStore({
  reducer: combineReducers({
    login: loginReducer,
    home: homeReducer,
    orderInfo: orderInfoReducer,
  }),
  middleware: [thunk],
});

export default store;

// const store = configureStore({
//     reducer: {
//       login: loginReducer,
//       dashboard: dashboardReducer,
//       order: orderReducer,
//       cart: cartReducer,
//       deliveryAgent: deliveryAgentReducer,
//       trackOrder: trackOrderReducer,
//     },
// });