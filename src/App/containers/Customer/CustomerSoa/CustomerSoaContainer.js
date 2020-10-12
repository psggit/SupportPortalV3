import { connect } from "react-redux";
import { CustomerSoa } from "./CustomerSoaComponent";
import { CustomerSOA } from "./mockData";
import { fetchCustomerSoaList } from "./duck/consumerSoaOperations";

const mapStateToProps = (state) => {
  console.log("[soaContainer]", state);
  return {
    CustomerSoaList: CustomerSOA,
    soaList: state.soa.customerSoaList,
    customerId: state.order.orderInfo.customerId,
    soaProgress: state.soa.soaProgress,
    soaSuccess: state.soa.soaSuccess,
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
