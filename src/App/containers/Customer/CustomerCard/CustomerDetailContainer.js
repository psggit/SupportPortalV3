/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { CustomerDetails } from './CustomerDetailComponent'
// import { fetchCustomerDetail } from './duck'
import { data } from './mockData';
import { fetchConsumerNotes } from "./duck/customerDetailOperation"

const mapStateToProps = (state) => {
  if (state.notes.notesData !== null){
    console.log("[customer-detail-container]", state.notes.notesData)
  }
   
  return {
    orderDetails: data,
    orderInfo: state.orderInfo.orderInfo,
    notesData: state.notes.notesData,
    notesProgress: state.notes.notesProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConsumerNotes: (payload) => dispatch(fetchConsumerNotes(payload)),
  };
};

const CustomerDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerDetailContainer };
