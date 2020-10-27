import { connect } from "react-redux";
import { OrderDetailsCard } from "./orderDetailsCard";
import {
  cancelOrderSummary,
  deliverOrderReasons,
  fetchKycList,
  deliverOrder,
  cancelOrder,
} from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    cancelOrderSuccess: state.order.orderCard.cancelOrderSuccess,
    cancelOrderFailure: state.order.orderCard.cancelOrderFailure,
    cancelOrderProgress: state.order.orderCard.cancelOrderProgress,
    errorMsg: state.order.orderCard.errorMsg,
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrderSummary: (payload) => dispatch(cancelOrderSummary(payload)),
    deliverOrderReasons: (payload) => dispatch(deliverOrderReasons(payload)),
    fetchKycList: () => dispatch(fetchKycList()),
    deliverOrder: (payload) => dispatch(deliverOrder(payload)),
    cancelOrder: (payload) => dispatch(cancelOrder(payload)),
  };
};

const OrderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsCard);

export { OrderDetailsContainer };
