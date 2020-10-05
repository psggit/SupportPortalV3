import { connect } from "react-redux";
import { OrderDetailsComponent } from "./OrderDetailsComponent";
import { selectOrder } from "../Dashboard/duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderData: state.home.orderData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectOrder: (orderId) => dispatch(selectOrder(orderId)),
  };
};

const OrderDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsComponent);

export { OrderDetailsContainer };
