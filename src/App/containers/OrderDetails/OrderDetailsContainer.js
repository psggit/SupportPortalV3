import { connect } from "react-redux";
import { OrderDetailsComponent } from "./OrderDetailsComponent";
import { selectOrder, fetchOrderDetails } from "./duck";

const mapStateToProps = (state) => {
  // console.log("mapstatetoprops - order details", state);
  return {
    orderId: state.home.orderId,
    payloadInfo: state.home.payloadInfo,
    orderData: state.home.orderData,
    fetchDetailsProgress: state.home.fetchDetailsProgress,
    fetchDetailsFail: state.home.fetchDetailsFail,
    fetchDetailsSuccess: state.home.fetchDetailsSuccess,
    errorMsg: state.home.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectOrder: (orderId) => dispatch(selectOrder(orderId)),
    fetchOrderDetails: (payload) => dispatch(fetchOrderDetails(payload)),
  };
};

const OrderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsComponent);

export { OrderDetailsContainer };
