import { connect } from "react-redux";
import { CancellationSummaryComponent } from "./CancellationSummaryComponent";
import { triggerRefund } from "./duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    triggerRefundSuccess: state.cancellationSummary.triggerRefundSuccess,
    triggerRefundFailed: state.cancellationSummary.triggerRefundFailed,
    triggerRefundProgress: state.cancellationSummary.triggerRefundProgress,
    errorMsg: state.cancellationSummary.errorMsg,
    successMsg: state.cancellationSummary.successMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    triggerRefund: (payload) => dispatch(triggerRefund(payload)),
  };
};

const CancellationSummaryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CancellationSummaryComponent);

export { CancellationSummaryContainer };
