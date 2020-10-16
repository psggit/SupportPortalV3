import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
} from "./actions";
import { fetchNotesAPI } from "../../../../utils/fetchNotesAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchNotesSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchNotesFailed(error));
  };
};

const fetchConsumerNotes = (orderId) => {
  let reqBody = {
    order_id: orderId,
    type: "customer",
  };
  return (dispatch) => {
    dispatch(fetchNotesProgress());
    fetchNotesAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchConsumerNotes };
