import { connect } from 'react-redux';
import { RetailerDetails } from './RetailerComponent';
import { data } from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails:data,
    orderInfo: state.orderInfo.orderInfo,
    retailerDetails: state.orderInfo,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const RetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerDetails);

export { RetailerContainer };
