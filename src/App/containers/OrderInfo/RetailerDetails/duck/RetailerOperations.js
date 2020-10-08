import {
  fetchRetailerNotesSuccess,
  fetchRetailerNotesFailed,
  fetchRetailerNotesProgress,
} from "./action";
// import { createSession } from "../../../utils";
import { fetchRetailerNotesAPI } from "../../../../utils/fetchRetailerNotesAPI";

const processResponse = () => {
  console.log("[processResponse]");
  return (res) => {
    if (res.ok) {
      return res.json();
    }
    if (res.status === 400) {
      throw new Error("invalid params");
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    console.log("[onSuccess] data", data);
    dispatch(fetchRetailerNotesSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchRetailerNotesFailed(err));
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

export { fetchRetailerNotes };
