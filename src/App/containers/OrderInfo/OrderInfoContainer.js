import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchOrder } from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderInfo: state.orderInfo.orderInfo,
    fetchOrderInfoSuccess: state.orderInfo.fetchOrderInfoSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
