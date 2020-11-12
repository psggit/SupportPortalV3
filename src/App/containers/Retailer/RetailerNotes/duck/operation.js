import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchRetailerNotesListSuccess,
  fetchRetailerNotesListFailure,
  fetchRetailerNotesListProgress,
} from "./action";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { retailerTypeNotesAPI } from "../../../../utils/retailerTypeNotesAPI";

const processResponse = () => {
  // console.clear();
  // console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  console.log("[onSuccess]");
  return (data) => {
    dispatch(fetchNotesSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchNotesFailure(error));
  };
};

const onNoteSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchRetailerNotesListSuccess(data));
  };
};

const onNoteError = (dispatch) => {
  return (error) => {
    dispatch(fetchRetailerNotesListFailure(error));
  };
};

const fetchRetailerNotesList = (reqBody) => {
  console.clear();
  return (dispatch) => {
    dispatch(fetchNotesInProgress());
    fetchRetailerNotesAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const fetchNoteList = () => {
  return (dispatch) => {
    dispatch(fetchRetailerNotesListProgress());
    retailerTypeNotesAPI(
      processResponse(dispatch),
      onNoteSuccess(dispatch),
      onNoteError(dispatch)
    );
  };
}

export { fetchRetailerNotesList, fetchNoteList };
