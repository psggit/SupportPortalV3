import { connect } from "react-redux";
import { CartComponent } from "./CartComponent";
import { fetchSummary } from "./duck";

const mapStateToProps = (state) => {
  // console.log("[mapping state in cart container]", state);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    products: state.order.orderInfo.products,
    orderSummary: state.cart.orderSummary,
    fetchGenreProgress: state.cart.fetchGenreProgress,
    fetchGenreFailed: state.cart.fetchGenreFailed,
    fetchGenreSuccess: state.cart.fetchGenreSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSummary: (payload) => dispatch(fetchSummary(payload)),
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export { CartContainer };
