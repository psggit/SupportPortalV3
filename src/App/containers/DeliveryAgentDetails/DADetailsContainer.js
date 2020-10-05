import { connect } from 'react-redux';
import { DADetails } from './DADetailsComponent';
import {data} from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails: data
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
