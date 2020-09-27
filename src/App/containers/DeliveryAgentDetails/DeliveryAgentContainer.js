import { connect } from 'react-redux';
import { DeliveryAgentDetails } from './DeliveryAgentComponent';
import {data} from './mockData';

const mapStateToProps = (state) => {
  return {
    orderDetails: data
  };
};

const mapDispatchToProps = () => {
  return {};
};

const DeliveryAgentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentDetails);

export { DeliveryAgentContainer };
