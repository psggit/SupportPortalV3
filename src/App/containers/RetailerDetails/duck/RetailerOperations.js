import { fetchRetailerSuccess, fetchRetailerFailed, fetchRetailerNotesSuccess, fetchRetailerNotesFailed } from "./action";
import { fetchRetailerDetailsAPI } from "../../../utils";
import { createSession } from "../../../utils/session";

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
  console.log("[onSuccess]");
  return (data) => {
    console.log("data");
    console.log(data);
    dispatch(fetchRetailerSuccess(data));
    createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    console.log("[onError]", err);
    dispatch(fetchRetailerFailed(err));
  };
};

const sendRetailerId = (retailerId) => {
  console.log("[sendLoginEmail]");
  let reqBody = {
    retailer_id: retailerId,
  };
  return (dispatch) => {
    fetchRetailerDetailsAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { sendRetailerId };
