import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  fetchActivityLogsProgress,
  fetchActivityLogsFailed,
  fetchActivityLogsSuccess,
} from "./actions";
import { genresAPI, acitivityLogsAPI } from "../../../utils";

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
    dispatch(fetchOrderSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderFailed());
  };
};

const fetchGenre = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress());
    genresAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const onSuccessLogs = (dispatch) => {
  return (data) => {
    dispatch(fetchActivityLogsSuccess(data));
  };
};

const onErrorLogs = (dispatch) => {
  return (err) => {
    dispatch(fetchActivityLogsFailed(err));
  };
};

const fetchActivityLogs = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchActivityLogsProgress());
    acitivityLogsAPI(reqBody, processResponse, onSuccessLogs, onErrorLogs);
  };
};

export { fetchGenre, fetchActivityLogs };
