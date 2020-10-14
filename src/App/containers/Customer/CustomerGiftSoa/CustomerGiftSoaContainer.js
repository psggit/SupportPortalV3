import { connect } from "react-redux";
import { CustomerGiftSoa } from "./CustomerGiftSoaComponent";
import { CustomerGiftSOA } from "./mockData";
import { fetchGiftSoaList } from "./duck/giftSoaOperations";

const mapStateToProps = (state) => {
  console.log("[gift-soa-container]", state);
  return {
    //CustomerGiftSoaList: CustomerGiftSOA,
    giftSoaList: state.giftSoa.customerGiftSoaList,
    customerNumber: state.order.orderInfo.customerContactNumber,
    customerId: state.order.orderInfo.customerId,
    giftSoaSuccess: state.giftSoa.giftSoaSuccess,
    giftSoaProgress: state.giftSoa.giftSoaProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGiftSoaList: (payload) => dispatch(fetchGiftSoaList(payload)),
  };
};

const CustomerGiftSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerGiftSoa);

export { CustomerGiftSoaContainer };
