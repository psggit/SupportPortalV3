import { connect } from "react-redux";
import { HipcoinsDetailsComponent } from "./HipcoinsDetailsComponent";
import { triggerEmail } from "./duck/operations";
// import { resetDefaultState } from "./duck/action";

const mapStateToProps = (state) => {
  return {
    loyalityPoints: state.hipcoins.loyalityPoints,
    errorMsg: state.hipcoinsDetails.errorMsg,
    successMsg: state.hipcoinsDetails.successMsg,
    triggerEmailSuccess: state.hipcoinsDetails.triggerEmailSuccess,
    triggerEmailFailed: state.hipcoinsDetails.triggerEmailFailed,
    triggerEmailInProgress: state.hipcoinsDetails.triggerEmailInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerEmail: (payload) => dispatch(triggerEmail(payload)),
  };
};

const HipcoinsDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HipcoinsDetailsComponent);

export { HipcoinsDetailsContainer };
