import { connect } from "react-redux";
import { CustomerSoa } from "./CustomerSoaComponent";
import { CustomerSOA } from "./mockData";
import { fetchCustomerSoaList } from "./duck/consumerSoaOperations";

const mapStateToProps = (state) => {
  console.log("[soaContainer]", state);
  console.log(
    "success",
    state.soa.soaSuccess,
    "progress",
    state.soa.soaProgress,
    "fail",
    state.soa.soaFail
  );
  return {
    CustomerSoaList: CustomerSOA,
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
