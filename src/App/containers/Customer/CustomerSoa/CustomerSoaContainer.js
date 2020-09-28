import { connect } from 'react-redux';
import { CustomerSoa} from './CustomerSoaComponent'
import { CustomerSOA } from './mockData';

const mapStateToProps = (state) => {
  return {
    CustomerSoaList: CustomerSOA.data
  };
};

const mapDispatchToProps = () => {
  return {};
};

const CustomerSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerSoa);

export { CustomerSoaContainer };
