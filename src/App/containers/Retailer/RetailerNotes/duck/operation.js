import {
  fetchNotesSuccessfull,
  fetchNotesFailure,
  fetchNotesInProgress,
} from "./action";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";

const processResponse = () => {
  // console.clear();
  // console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
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

const fetchRetailerNotesList = (reqBody) => {
  console.clear();
  console.log("fetchRetailerNotesList");
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

export { fetchRetailerNotesList };
