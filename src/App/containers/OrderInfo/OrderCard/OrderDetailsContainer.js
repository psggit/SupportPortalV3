import { connect } from "react-redux";
import { OrderDetailsCard } from "./orderDetailsCard";
import {
  cancelOrderSummary,
  deliverOrderReasons,
  fetchKycList,
  deliverOrder,
  cancelOrder,
  fetchCancelReason,
} from "./duck/operations";
import { resetOnUnmount } from "./duck";

const mapStateToProps = (state) => {
  //console.log("mapStateToProps ", state.order.orderCard.errorMsg);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    cancelOrderSuccess: state.order.orderCard.cancelOrderSuccess,
    cancelOrderFailure: state.order.orderCard.cancelOrderFailure,
    cancelOrderProgress: state.order.orderCard.cancelOrderProgress,
    errorMsg: state.order.orderCard.errorMsg,
    errorMsgCancel: state.order.orderCard.errorMsgCancel,
    successMsg: state.order.orderCard.successMsg,
    cancelOrderSummaryData: state.order.orderCard.cancelOrderSummaryData,
    deliverOrderData: state.order.orderCard.deliverOrderData,
    fetchDeliverOrderSuccess: state.order.orderCard.fetchDeliverOrderSuccess,
    fetchDeliverOrderFailed: state.order.orderCard.fetchDeliverOrderFailed,
    fetchDeliverOrderProgress: state.order.orderCard.fetchDeliverOrderProgress,
    kycListData: state.order.orderCard.kycListData,
    fetchKycListSuccess: state.order.orderCard.fetchKycListSuccess,
    fetchKycListFailed: state.order.orderCard.fetchKycListFailed,
    fetchKycListProgress: state.order.orderCard.fetchKycListProgress,
    deliverOrderProgress: state.order.orderCard.deliverOrderProgress,
    deliverOrderFailed: state.order.orderCard.deliverOrderFailed,
    deliverOrderSuccess: state.order.orderCard.deliverOrderSuccess,
    fetchCancellationSummarySuccess:
      state.order.orderCard.fetchCancellationSummarySuccess,
    fetchCancellationSummaryFailed:
      state.order.orderCard.fetchCancellationSummaryFailed,
    fetchCancellationSummaryProgress:
      state.order.orderCard.fetchCancellationSummaryProgress,
    cancelReasons: state.order.orderCard.cancelReasons,
    fetchCancelReasonSuccess: state.order.orderCard.fetchCancelReasonSuccess,
    fetchCancelReasonFailure: state.order.orderCard.fetchCancelReasonFailure,
    fetchCancelReasonProgress: state.order.orderCard.fetchCancelReasonProgress,
    errorMsgSummary: state.order.orderCard.errorMsgSummary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrderSummary: (payload) => dispatch(cancelOrderSummary(payload)),
    deliverOrderReasons: (payload) => dispatch(deliverOrderReasons(payload)),
    fetchKycList: () => dispatch(fetchKycList()),
    deliverOrder: (payload) => dispatch(deliverOrder(payload)),
    cancelOrder: (payload) => dispatch(cancelOrder(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
    fetchCancelReason: (orderId) => dispatch(fetchCancelReason(orderId)),
  };
};

const OrderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsCard);

export { OrderDetailsContainer };
