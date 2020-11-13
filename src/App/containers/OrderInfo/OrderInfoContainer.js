import { connect } from "react-redux";
import { OrderInfoComponent } from "./OrderInfoComponent";
import { fetchConsumerNotesList } from "./CustomerDetails/duck/CustomerOperations";
import {
  fetchOrder,
  fetchCancelReason,
  createNotes,
  connectCall,
  fetchIssueTypes,
  submitIssue,
  resetOnUnmount,
} from "../OrderInfo/duck";

const mapStateToProps = (state) => {
  // console.log("mapStateToProps ", state.home);
  return {
    orderId: state.home.orderId,
    order: state.order.orderInfo.orderDetails,
    retailerDetails: state.order.retailerDetails,
    customerId: state.order.orderInfo.customerId,
    customerContactNumber: state.order.orderInfo.customerContactNumber,
    fetchOrderInfoSuccess: state.order.orderInfo.fetchOrderInfoSuccess,
    fetchOrderInfoProgress: state.order.orderInfo.fetchOrderInfoProgress,
    fetchOrderInfoFailure: state.order.orderInfo.fetchOrderInfoFailure,
    cancelReasons: state.order.orderInfo.cancelReasons,
    fetchCancelReasonSuccess: state.order.orderInfo.fetchCancelReasonSuccess,
    fetchCancelReasonFailure: state.order.orderInfo.fetchCancelReasonFailure,
    customerDetails: state.order.customerDetails,
    from: state.login.authData.mobile,
    successMsg: state.order.orderInfo.successMsg,
    connectCallSuccess: state.order.orderInfo.connectCallSuccess,
    fetchIssueTypesSuccess: state.order.orderInfo.fetchIssueTypesSuccess,
    fetchIssueTypesProgress: state.order.orderInfo.fetchIssueTypesProgress,
    fetchIssueTypesFailed: state.order.orderInfo.fetchIssueTypesFailed,
    issueTypes: state.order.orderInfo.issueTypes,
    submitIssueSuccess: state.order.orderInfo.submitIssueSuccess,
    createNotesSuccess: state.order.orderInfo.createNotesSuccess,
    noteListData: state.order.customer.noteListData,
    consumerNoteListSuccess: state.order.customer.consumerNoteListSuccess,
    consumerNoteListFailed: state.order.customer.consumerNoteListFailed,
    consumerNoteListProgress: state.order.customer.consumerNoteListProgress,
    NoteListSuccess: state.order.customer.NoteListSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderInfo: (orderId) => dispatch(fetchOrder(orderId)),
    fetchCancelReason: (orderId) => dispatch(fetchCancelReason(orderId)),
    createNotes: (type) => dispatch(createNotes(type)),
    connectCall: (payload) => dispatch(connectCall(payload)),
    fetchIssueTypes: () => dispatch(fetchIssueTypes()),
    submitIssue: (payload) => dispatch(submitIssue(payload)),
    resetOnUnmount: () => dispatch(resetOnUnmount()),
    fetchConsumerNotesList: () => dispatch(fetchConsumerNotesList()),
  };
};

const OrderInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderInfoComponent);

export { OrderInfoContainer };
