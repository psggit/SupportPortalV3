import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { loginReducer } from "../containers/Login";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: [thunk]
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