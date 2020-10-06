import { connect } from 'react-redux';
import { DADetails } from './DADetailsComponent';
import {data} from './mockData';

const mapStateToProps = (state) => {
  console.log("state in da details", state)
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
