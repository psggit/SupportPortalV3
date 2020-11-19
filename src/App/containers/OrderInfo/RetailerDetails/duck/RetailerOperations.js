import {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
  fetchRetailerIssueListSuccess,
  fetchRetailerIssueListFailure,
  fetchRetailerIssueListProgress,
} from "./action";
// import { createSession } from "../../../utils";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";
import { retailerTypeNotesAPI } from "../../../../utils/retailerTypeNotesAPI";

const processResponse = () => {
  // console.log("[processResponse]");
  return (res) => {
    if (res.ok) {
      return res.json();
    } else if (res.status === 400) {
      throw new Error("invalid params");
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(fetchRetailerNotesSuccess(data));
    // createSession(data);
  };
};

const onSuccessIssue = (dispatch) => {
  return (data) => {
    dispatch(fetchRetailerIssueListSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchRetailerNotesFailed(err));
  };
};

const onErrorIssue = (dispatch) => {
  return (error) => {
    dispatch(fetchRetailerIssueListFailure(error));
  };
};

const fetchRetailerNotes = (orderId) => {
  let reqBody = {
    order_id: orderId,
    type: "retailer",
  };
  return (dispatch) => {
    dispatch(fetchRetailerNotesProgress());
    fetchRetailerNotesAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const fetchRetailerIssueList = () => {
  return (dispatch) => {
    dispatch(fetchRetailerIssueListProgress());
    retailerTypeNotesAPI(
      processResponse(dispatch),
      onSuccessIssue(dispatch),
      onErrorIssue(dispatch)
    );
  };
};

export { fetchRetailerNotes, fetchRetailerIssueList };
