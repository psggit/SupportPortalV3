import { connect } from "react-redux";
import { CartModificationComponent } from "./CartModificationComponent";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    orderData: state.home.orderData,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {};
};

const CartModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartModificationComponent);

export { CartModificationContainer };
