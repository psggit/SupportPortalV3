import { connect } from "react-redux";
import { HipcoinsComponent } from "./HipcoinsComponent";
import { fetchLoyalityPoints } from "./duck/operations";

const mapStateToProps = (state) => {
  return {
    loyalityPoints: state.hipcoins.loyalityPoints,
    errorMsg: state.hipcoins.errorMsg,
    fetchLoyalityPointsSuccess: state.hipcoins.fetchLoyalityPointsSuccess,
    fetchLoyalityPointsFailed: state.hipcoins.fetchLoyalityPointsFailed,
    fetchLoyalityPointsInProgress: state.hipcoins.fetchLoyalityPointsInProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLoyalityPointsList: (payload) =>
      dispatch(fetchLoyalityPoints(payload)),
  };
};

const HipcoinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HipcoinsComponent);

export { HipcoinsContainer };
