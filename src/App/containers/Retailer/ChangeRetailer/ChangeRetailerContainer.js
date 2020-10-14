import { connect } from "react-redux";
import { ChangeRetailerComponent } from "./ChangeRetailerComponent";

const mapStateToProps = (state) => {
  console.log("orderinfocontainer", state);
  return {
    orderId: state.home.orderId,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
//   };
// };

const ChangeRetailerContainer = connect(
  mapStateToProps,
  null
)(ChangeRetailerComponent);

export { ChangeRetailerContainer };
