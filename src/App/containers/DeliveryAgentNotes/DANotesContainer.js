import { connect } from 'react-redux';
import DANotes from './DANotesComponent';
import {fetchDANotes} from './../DeliveryAgentNotes/duck';

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    daNotes: state.daNotes.daNotes,
    fetchDANotesProgress: state.daNotes.fetchDANotesProgress
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDANotes: (payload) => dispatch(fetchDANotes(payload))
  };
};

const DANotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DANotes);

export { DANotesContainer };
