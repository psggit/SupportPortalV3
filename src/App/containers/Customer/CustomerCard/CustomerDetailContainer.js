import { connect } from 'react-redux';
import { CustomerDetails } from './CustomerDetailComponent'
import { fetchCustomerDetail } from './duck'
import { data } from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails: data
  };
};

const mapDispatchToProps = () => {
  return {
    fetchCustomerDetail: () => dispatch(fetchCustomerDetail()),
  };
};

const CustomerDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetails);

export { CustomerDetailContainer };
