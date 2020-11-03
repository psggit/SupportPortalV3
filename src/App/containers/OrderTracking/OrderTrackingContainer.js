import { connect } from "react-redux";
import { OrderTrackingComponent } from "./OrderTrackingComponent";
import { fetchDeliveryStatus } from "./duck";

const mapStateToProps = (state) => {
  return {
    fetchLiveDataProgress: state.orderTracking.fetchLiveDataProgress,
    fetchLiveDataSuccess: state.orderTracking.fetchLiveDataSuccess,
    fetchLiveDataFailure: state.orderTracking.fetchLiveDataFailure,
    successMsg: state.orderTracking.successMsg,
    errorMsg: state.orderTracking.errorMsg,
    trackData: state.orderTracking.trackData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDeliveryStatus: (payload) => dispatch(fetchDeliveryStatus(payload)),
  };
};

const OrderTrackingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTrackingComponent);

export { OrderTrackingContainer };