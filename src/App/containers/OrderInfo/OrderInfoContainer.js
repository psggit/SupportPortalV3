import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchConsumerNotesList } from "./CustomerDetails/duck/CustomerOperations";
import { fetchListOrderModification } from "./ModificationDetails/duck/operations";
import {
  fetchOrder,
  createNotes,
  connectCall,
  fetchIssueTypes,
  submitIssue,
  resetOnUnmount,
} from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    order: state.order.orderInfo.orderDetails,
    retailerDetails: state.order.retailerDetails,
    customerId: state.order.orderInfo.customerId,
    customerContactNumber: state.order.orderInfo.customerContactNumber,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
    fetchOrderInfoFailure: state.order.orderInfo.fetchOrderInfoFailure,
    customerDetails: state.order.customerDetails,
    from: state.login.authData.mobile,
    successMsg: state.order.orderInfo.successMsg,
    errorMsg: state.order.orderInfo.errorMsg,
    connectCallSuccess: state.order.orderInfo.connectCallSuccess,
    fetchIssueTypesSuccess: state.order.orderInfo.fetchIssueTypesSuccess,
    fetchIssueTypesProgress: state.order.orderInfo.fetchIssueTypesProgress,
    fetchIssueTypesFailed: state.order.orderInfo.fetchIssueTypesFailed,
    issueTypes: state.order.orderInfo.issueTypes,
    submitIssueSuccess: state.order.orderInfo.submitIssueSuccess,
    createNotesSuccess: state.order.orderInfo.createNotesSuccess,
    noteListData: state.order.customer.noteListData,
    fetchCustomerNotesFailed: state.order.customer.fetchCustomerNotesFailed,
    fetchCustomerNotesProgress: state.order.customer.fetchCustomerNotesProgress,
    fetchCustomerNotesSuccess: state.order.customer.fetchCustomerNotesSuccess,
    NoteListSuccess: state.order.customer.NoteListSuccess,
    retailerIssueListData: state.order.retailer.retailerIssueList,
    fetchRetailerIssueListSuccess:
      state.order.retailer.fetchRetailerIssueListSuccess,
    fetchRetailerIssueListFailure:
      state.order.retailer.fetchRetailerIssueListFailure,
    errorMessageRetailerList: state.order.retailer.errorMessage,
    fetchDaIssueListSuccess: state.order.deliveryAgent.fetchDaIssueListSuccess,
    fetchDaIssueListFailure: state.order.deliveryAgent.fetchDaIssueListFailure,
    daIssueList: state.order.deliveryAgent.daIssueList,
    errorMessageList: state.order.deliveryAgent.errorMessageList,
    errorMessageCustomerNotes: state.order.customer.errorMessageCustomerNotes,
    errorMsgIssueTypes: state.order.orderInfo.errorMsgIssueTypes,
    errorDAList: state.order.deliveryAgent.errorDAList,
    orderList: state.orderModify.orderList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
    createNotes: (type) => dispatch(createNotes(type)),
    connectCall: (payload) => dispatch(connectCall(payload)),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    submitIssue: (payload) => dispatch(submitIssue(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
    fetchConsumerNotesList: () => dispatch(fetchConsumerNotesList()),
    fetchListOrderModification: (payload) =>
      dispatch(fetchListOrderModification(payload)),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
