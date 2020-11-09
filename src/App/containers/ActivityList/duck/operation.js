import {
  fetchActLogsSuccessfull,
  fetchActLogsFailure,
  fetchActLogsInProgress,
} from "./action";
import { acitivityLogsAPI } from "../../../utils";

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
    dispatch(fetchActLogsSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchActLogsFailure(json));
    });
  };
};

const fetchActLogsList = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchActLogsInProgress());
    acitivityLogsAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchActLogsList };
