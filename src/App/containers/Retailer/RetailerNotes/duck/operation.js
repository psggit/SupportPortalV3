import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
  fetchIssueListSuccess,
  fetchIssueListFailure,
  fetchIssueListProgress,
} from "./action";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { retailerTypeNotesAPI } from "../../../../utils/retailerTypeNotesAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
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
    dispatch(fetchIssueListSuccess(data));
    //console.log("onNoteSuccess-retailer", data);
  };
};

const onNoteError = (dispatch) => {
  return (error) => {
    dispatch(fetchIssueListFailure(error));
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
    dispatch(fetchIssueListProgress());
    retailerTypeNotesAPI(
      processResponse(dispatch),
      onNoteSuccess(dispatch),
      onNoteError(dispatch)
    );
  };
};

export { fetchRetailerNotesList, fetchNoteList };
