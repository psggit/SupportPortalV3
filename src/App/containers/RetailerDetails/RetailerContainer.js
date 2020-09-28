import { connect } from 'react-redux';
import { RetailerDetails } from './RetailerComponent';
import { data } from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails: data
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
