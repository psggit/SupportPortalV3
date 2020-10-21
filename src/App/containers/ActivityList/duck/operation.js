import {
  fetchActLogsSuccessfull,
  fetchActLogsFailure,
  fetchActLogsInProgress,
} from "./action";
import { acitivityLogsAPI } from "../../../utils";

const processResponse = () => {
  console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccess = (dispatch) => {
  console.log("[onSuccess]");
  return (data) => {
    dispatch(fetchActLogsSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchActLogsFailure(error));
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
