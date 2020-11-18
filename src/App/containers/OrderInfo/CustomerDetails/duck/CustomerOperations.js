import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
  consumerNoteListSuccess,
  consumerNoteListFailed,
  consumerNoteListProgress,
} from "./actions";
import { fetchNotesAPI } from "../../../../utils/fetchNotesAPI";
import { consumerTypeNotesAPI } from "../../../../utils/consumerTypeNotesAPI";

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
  return (err) => {
    dispatch(fetchNotesFailed(err));
  };
};

const onNoteSuccess = (dispatch) => {
  return (data) => {
    dispatch(consumerNoteListSuccess(data));
  };
};

const onNoteError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(consumerNoteListFailed(json));
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

const fetchConsumerNotesList = () => {
  return (dispatch) => {
    dispatch(consumerNoteListProgress());
    consumerTypeNotesAPI(
      processResponse(dispatch),
      onNoteSuccess(dispatch),
      onNoteError(dispatch)
    );
  };
};

export { fetchConsumerNotes, fetchConsumerNotesList };
