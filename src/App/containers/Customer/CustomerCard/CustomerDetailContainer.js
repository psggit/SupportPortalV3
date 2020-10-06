/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { CustomerDetails } from './CustomerDetailComponent'
// import { fetchCustomerDetail } from './duck'
import { data } from './mockData';
import { sendOrderId } from "./duck/customerDetailOperation"

const mapStateToProps = (state) => {
  // console.log("[customer-detail-container]", state.orderInfo.orderInfo)
  return {
    orderDetails: data,
    orderInfo: state.orderInfo.orderInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendOrderId: (orderId) => dispatch(sendOrderId(orderId)),
  };
};

const CustomerDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerDetailContainer };
