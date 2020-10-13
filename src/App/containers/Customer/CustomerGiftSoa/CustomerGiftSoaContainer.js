import { connect } from "react-redux";
import { CustomerGiftSoa } from "./CustomerGiftSoaComponent";
import { CustomerGiftSOA } from "./mockData";
import { fetchGiftSoaList } from "./duck/giftSoaOperations";

const mapStateToProps = (state) => {
  return {
    CustomerGiftSoaList: CustomerGiftSOA,
    giftSoaList: state.giftSoa.CustomerGiftSoaList,
    customerNumber: state.order.orderInfo.customerContactNumber,
    customerId: state.order.orderInfo.customerId,
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
