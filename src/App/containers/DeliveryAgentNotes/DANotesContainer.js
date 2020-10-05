import { connect } from 'react-redux';
import { DANotes } from './DANotesComponent';
//import { data } from './mockData';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

const DANotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DANotes);

export { DANotesContainer };
