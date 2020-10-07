import { connect } from 'react-redux';
import { RetailerDetails } from './RetailerComponent';
import { sendOrderId } from './duck/RetailerOperations';
import { data } from './mockData';

const mapStateToProps = (state) => {
  console.log("mapStateToProps",state.retailerNotes.retailerNotesData)
  return {
    orderDetails:data,
    orderInfo: state.orderInfo.orderInfo,
    retailerDetails: state.orderInfo,
    retailerNotes: state.retailerNotes,
    fetchProgress: state.retailerNotes.fetchProgress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendOrderId: (orderId) => dispatch(sendOrderId(orderId)),
  };
};

const RetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerDetails);

export { RetailerContainer };
