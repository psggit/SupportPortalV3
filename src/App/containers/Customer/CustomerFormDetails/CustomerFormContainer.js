import { connect } from "react-redux";
import { CustomerForm } from "./CustomerFormComponent";
import { updateConsumer } from "./duck/formOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    updateProgress: state.update.updateProgress,
    updateFail: state.update.updateFail,
    updateSuccess: state.update.updateSuccess,
    updateSuccessMsg: state.update.updateSuccessMsg,
    orderId: state.home.orderId,
    customerId: state.order.orderInfo.customerId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateConsumer: (payload) => dispatch(updateConsumer(payload)),
  };
};

const CustomerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerForm);

export { CustomerFormContainer };
