import { connect } from "react-redux";
import { CustomerForm } from "./CustomerFormComponent";
import { updateConsumer } from "./duck/formOperations";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    customerData: state.update,
    orderId: state.home.orderId,
    orderInfo: state.order.orderInfo.orderInfo,
    customerId: state.order.orderInfo.customerId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateConsumer: (payload) => dispatch(updateConsumer(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const CustomerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);

export { CustomerFormContainer };
