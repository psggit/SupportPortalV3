import {
  fetchDANotesProgress,
  fetchDANotesFailure,
  fetchDANotesSuccess,
} from "./actions";

import { fetchDANotesAPI } from "./../../../utils";

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
  console.log("[onSuccess of fetchDANotes]");
  return (data) => {
    dispatch(fetchDANotesSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchDANotesFailure(err));
  };
};

const fetchDANotes = (payload) => {
  console.log("[fetchDANotes]", payload);
  return (dispatch) => {
    dispatch(fetchDANotesProgress());
    fetchDANotesAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchDANotes };
