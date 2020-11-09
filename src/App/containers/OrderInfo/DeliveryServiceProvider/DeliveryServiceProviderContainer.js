import { connect } from "react-redux";
import { DeliveryServiceProviderComponent } from "./DeliveryServiceProviderComponent";
import {
  pushOrderOperation,
  restockOrder,
  fetchOTPDSP,
  cancelOrderDSP,
} from "./duck";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    pushOrderSuccess: state.order.dsp.pushOrderSuccess,
    pushOrderFailed: state.order.dsp.pushOrderFailed,
    pushOrderProgress: state.order.dsp.pushOrderProgress,
    restockOrderSuccess: state.order.dsp.restockOrderSuccess,
    restockOrderFailed: state.order.dsp.restockOrderFailed,
    restockOrderProgress: state.order.dsp.restockOrderProgress,
    fetchOTPSuccess: state.order.dsp.fetchOTPSuccess,
    fetchOTPFailed: state.order.dsp.fetchOTPFailed,
    fetchOTPProgress: state.order.dsp.fetchOTPProgress,
    cancelOrderDSPSuccess: state.order.dsp.cancelOrderDSPSuccess,
    cancelOrderDSPFailed: state.order.dsp.cancelOrderDSPFailed,
    cancelOrderDSPProgress: state.order.dsp.cancelOrderDSPProgress,
    errorMsg: state.order.dsp.errorMsg,
    message: state.order.dsp.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushOrderOperation: (orderId) => dispatch(pushOrderOperation(orderId)),
    restockOrder: (orderId) => dispatch(restockOrder(orderId)),
    fetchOTPDSP: (orderId) => dispatch(fetchOTPDSP(orderId)),
    cancelOrderDSP: (orderId) => dispatch(cancelOrderDSP(orderId)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const DeliveryServiceProviderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryServiceProviderComponent);

export { DeliveryServiceProviderContainer };
