import { connect } from 'react-redux';
import { CustomerGiftSoa } from './CustomerGiftSoaComponent'
import { CustomerGiftSOA } from './mockData';

const mapStateToProps = (state) => {
  return {
    CustomerGiftSoaList: CustomerGiftSOA
  };
};

const mapDispatchToProps = () => {
  return {};
};

const CustomerGiftSoaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerGiftSoa);

export { CustomerGiftSoaContainer };
