import {
  fetchCustomerNotesSuccess,
  fetchCustomerNotesFailed,
  fetchCustomerNotesProgress,
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
    } else if (res.status === 400) {
      throw new Error("invalid params");
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchCustomerNotesSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchCustomerNotesFailed(err));
  };
};

const onNoteSuccess = (dispatch) => {
  return (data) => {
    dispatch(consumerNoteListSuccess(data));
  };
};

const onNoteError = (dispatch) => {
  return (error) => {
    dispatch(consumerNoteListFailed(error));
  };
};

const fetchConsumerNotes = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchCustomerNotesProgress());
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
