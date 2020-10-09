import { connect } from "react-redux";
import { Notes } from "./NotesComponent";
import { NotesList } from "./mockData";

const mapStateToProps = () => {
  return {
    notes: NotesList,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Notes);

export { NotesContainer };
