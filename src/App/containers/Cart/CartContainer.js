import { connect } from "react-redux";
import { CartComponent } from "./CartComponent";
import {
  fetchSummary,
  updateCart,
  validateCart,
  resetOnUnmountFn,
} from "./duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    products: state.order.orderInfo.products,
    cart: state.cart,
    cartSummary: state.cart.cartSummary,
    validateOrderSuccess: state.cart.validateOrderSuccess,
    validateOrderFailed: state.cart.validateOrderFailed,
    validateOrderProgress: state.cart.validateOrderProgress,
    fetchCartSummarySuccess: state.cart.fetchCartSummarySuccess,
    fetchCartSummaryFailed: state.cart.fetchCartSummaryFailed,
    fetchCartSummaryProgress: state.cart.fetchCartSummaryProgress,
    fetchUpdateCartSuccess: state.cart.fetchUpdateCartSuccess,
    fetchUpdateCartFailed: state.cart.fetchUpdateCartFailed,
    fetchUpdateCartProgress: state.cart.fetchUpdateCartProgress,
    errorMsg: state.cart.errorMsg,
    successMsg: state.cart.successMsg,
    validateInfo: state.cart.validateInfo,
    msg: state.cart.msg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSummary: (payload) => dispatch(fetchSummary(payload)),
    updateCart: (payload) => dispatch(updateCart(payload)),
    validateCart: (payload) => dispatch(validateCart(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmountFn()),
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export { CartContainer };
