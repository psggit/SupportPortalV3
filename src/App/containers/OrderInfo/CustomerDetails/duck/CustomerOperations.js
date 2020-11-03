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
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchNotesSuccess(data));
  };
};

const onError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchNotesFailed(json));
    });
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
