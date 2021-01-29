import { connect } from "react-redux";
import { CancellationSummaryComponent } from "./CancellationSummaryComponent";
import { triggerRefund } from "./duck";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderDetails,
    cancellationSummary: state.cancellationSummary,
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
