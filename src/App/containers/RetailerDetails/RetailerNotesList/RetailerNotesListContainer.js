import { connect } from 'react-redux';
import { RetailerNotesListComponent } from './RetailerNotesListComponent';
import { RetailerNotes } from './mockData';

const mapStateToProps = (state) => {
  return {
    RetailerNotes: RetailerNotes.data,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const RetailerNotesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RetailerNotesListComponent);

export { RetailerNotesListContainer };
