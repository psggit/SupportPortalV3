import { connect } from "react-redux";
import { OrderDetailsCard } from "./orderDetailsCard";
import {
  cancelOrder,
  deliverOrderReasons,
  fetchKycList,
  deliverOrder,
} from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    cancelOrderSuccess: state.order.orderCard.cancelOrderSuccess,
    cancelOrderFailure: state.order.orderCard.cancelOrderFailure,
    cancelOrderProgress: state.order.orderCard.cancelOrderProgress,
    cancelOrderData: state.order.orderCard.cancelOrderData,
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrder: (payload) => dispatch(cancelOrder(payload)),
    deliverOrderReasons: (payload) => dispatch(deliverOrderReasons(payload)),
    fetchKycList: () => dispatch(fetchKycList()),
    deliverOrder: (payload) => dispatch(deliverOrder(payload)),
  };
};

const OrderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsCard);

export { OrderDetailsContainer };
