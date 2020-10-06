import { connect } from 'react-redux';
import { ChangeRetailer } from './ChangeRetailerComponent';
import { data } from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails: data
  };
};

const mapDispatchToProps = () => {
  return {};
};

const ChangeRetailerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeRetailer);

export { ChangeRetailerContainer };
