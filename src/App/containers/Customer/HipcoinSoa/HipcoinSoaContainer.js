import { connect } from "react-redux";
import { HipcoinSoa } from "./HipcoinSoaComponent";
import { fetchHipcoinSoaList } from "./duck/operation";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    hipcoinSoaList: state.hipcoinSoa.hipcoinSoaList,
    customerNumber: state.order.orderInfo.customerContactNumber,
    customerId: state.order.orderInfo.customerId,
    hipcoinSoaSuccess: state.hipcoinSoa.hipcoinSoaSuccess,
    hipcoinSoaProgress: state.hipcoinSoa.hipcoinSoaProgress,
    hipcoinSoaFail: state.hipcoinSoa.hipcoinSoaFail,
    errorMsg: state.hipcoinSoa.errorMsg,
    orderId: state.home.orderId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHipcoinSoaList: (payload) => dispatch(fetchHipcoinSoaList(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const HipcoinSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HipcoinSoa);

export { HipcoinSoaContainer };
