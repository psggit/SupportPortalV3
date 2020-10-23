import { connect } from "react-redux";
import { CustomerForm } from "./CustomerFormComponent";
import { updateConsumer } from "./duck/formOperations";

const mapStateToProps = (state) => {
  console.log("[FormContainer]", state, state.update.updateSuccessMsg);
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    //updateConsumerData: state.order.orderInfo.updateConsumerData,
    updateProgress: state.update.updateProgress,
    updateFail: state.update.updateFail,
    updateSuccess: state.update.updateSuccess,
    updateSuccessMsg: state.update.updateSuccessMsg,
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
