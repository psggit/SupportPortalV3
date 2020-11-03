import { connect } from "react-redux";
import { CustomerGiftSoa } from "./CustomerGiftSoaComponent";
import { fetchGiftSoaList } from "./duck/giftSoaOperations";
import { resetOnUnmount } from "./duck/index";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    giftSoaList: state.giftSoa.customerGiftSoaList,
    customerNumber: state.order.orderInfo.customerContactNumber,
    customerId: state.order.orderInfo.customerId,
    giftSoaSuccess: state.giftSoa.giftSoaSuccess,
    giftSoaProgress: state.giftSoa.giftSoaProgress,
    giftSoaFail: state.giftSoa.giftSoaFail,
    errorMsg: state.giftSoa.errorMsg,
    orderId: state.home.orderId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGiftSoaList: (payload) => dispatch(fetchGiftSoaList(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
  };
};

const CustomerGiftSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerGiftSoa);

export { CustomerGiftSoaContainer };
