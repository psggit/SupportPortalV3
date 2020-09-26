import { connect } from 'react-redux';
import { DeliveryAgentDetails } from './DeliveryAgentComponent';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const DeliveryAgentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAgentDetails);

export { DeliveryAgentContainer };
