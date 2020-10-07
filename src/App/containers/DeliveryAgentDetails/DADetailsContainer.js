import { connect } from 'react-redux';
import DADetails from './DADetailsComponent';

const mapStateToProps = (state) => {
  return {
    orderDetails: state.orderInfo.orderInfo,
    fetchOrderInfoProgress: state.orderInfo.fetchOrderInfoProgress
  };
};

const mapDispatchToProps = () => {
  return {};
};

const DADetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DADetails);

export { DADetailsContainer };
