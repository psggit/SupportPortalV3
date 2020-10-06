/* eslint-disable prettier/prettier */
import { connect } from 'react-redux';
import { CustomerDetails } from './CustomerDetailComponent'
// import { fetchCustomerDetail } from './duck'
import { data } from './mockData';

const mapStateToProps = (state) => {
  console.log("from store", state.home.orderData)
  return {
    orderDetails: data,
    orderInfo: state.orderInfo,
    orderId: state.home.orderId,
    orderData: state.home.orderData,
  };
};

const mapDispatchToProps = () => {
  return {
    // fetchCustomerDetail: () => dispatch(fetchCustomerDetail()),
  };
};

const CustomerDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerDetailContainer };
