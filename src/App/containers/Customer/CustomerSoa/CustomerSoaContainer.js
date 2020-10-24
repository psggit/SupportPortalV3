import { connect } from "react-redux";
import { CustomerSoa } from "./CustomerSoaComponent";
import { fetchCustomerSoaList } from "./duck/consumerSoaOperations";

const mapStateToProps = (state) => {
  return {
    orderInfo: state.order.orderInfo.orderInfo,
    soaList: state.soa.customerSoaList,
    customerId: state.order.orderInfo.customerId,
    soaProgress: state.soa.soaProgress,
    soaSuccess: state.soa.soaSuccess,
    soaFail: state.soa.soaFail,
    errorMsg: state.soa.errorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomerSoaList: (payload) => dispatch(fetchCustomerSoaList(payload)),
  };
};

const CustomerSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerSoa);

export { CustomerSoaContainer };
