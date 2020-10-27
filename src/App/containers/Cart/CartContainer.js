import { connect } from "react-redux";
import { CartComponent } from "./CartComponent";
import { fetchSummary, updateCart } from "./duck";

const mapStateToProps = (state) => {
  // console.log("[mapping state in cart container]", state);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    products: state.order.orderInfo.products,
    cartSummary: state.cart.cartSummary,
    fetchCartSummarySuccess: state.cart.fetchCartSummarySuccess,
    fetchCartSummaryFailed: state.cart.fetchCartSummaryFailed,
    fetchCartSummaryProgress: state.cart.fetchCartSummaryProgress,
    fetchUpdateCartSuccess: state.cart.fetchUpdateCartSuccess,
    fetchUpdateCartFailed: state.cart.fetchUpdateCartFailed,
    fetchUpdateCartProgress: state.cart.fetchUpdateCartProgress,
    errorMsg: state.cart.errorMsg,
    successMsg: state.cart.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSummary: (payload) => dispatch(fetchSummary(payload)),
    updateCart: (payload) => dispatch(updateCart(payload)),
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export { CartContainer };
