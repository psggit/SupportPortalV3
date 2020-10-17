import { connect } from "react-redux";
import { CustomerForm } from "./CustomerFormComponent";
import { updateConsumer } from "./duck/formOperations";

const mapStateToProps = (state) => {
  console.log("[FormContainer]", state.order.orderInfo.orderInfo);
  return {
    orderInfo: state.order.orderInfo.orderInfo,
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
