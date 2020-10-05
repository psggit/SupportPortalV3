import { connect } from 'react-redux';
import { DADetails } from './DADetailsComponent';
import {data} from './mockData';

const mapStateToProps = (state) => {
  console.log("state", state)
  return {
    orderDetails: state.orderInfo.orderInfo,
    fetchOrderInfoSuccess: state.orderInfo.fetchOrderInfoSuccess
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
