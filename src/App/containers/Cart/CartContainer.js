import { connect } from "react-redux";
import { CartComponent } from "./CartComponent";
import { fetchGenre } from "./duck";

const mapStateToProps = (state) => {
  // console.log("[mapping state in cart container]", state);
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    fetchGenreProgress: state.cart.fetchGenreProgress,
    fetchGenreFailed: state.cart.fetchGenreFailed,
    fetchGenreSuccess: state.cart.fetchGenreSuccess,
    fetchActivityLogsProgress: state.cart.fetchActivityLogsProgress,
    fetchActivityLogsFailed: state.cart.fetchActivityLogsFailed,
    fetchActivityLogsSuccess: state.cart.fetchActivityLogsSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenre: (payload) => dispatch(fetchGenre(payload)),
  };
};

const CartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComponent);

export { CartContainer };
