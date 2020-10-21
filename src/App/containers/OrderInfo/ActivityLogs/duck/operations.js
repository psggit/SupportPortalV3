import { fetchLogProgress, fetchLogFailed, fetchLogSuccess } from "./actions";
import { acitivityLogsAPI } from "../../../../utils";

const processResponseLogs = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccessLogs = (dispatch) => {
  return (data) => {
    dispatch(fetchLogSuccess(data));
  };
};

const onErrorLogs = (dispatch) => {
  return (err) => {
    dispatch(fetchLogFailed(err));
  };
};

const fetchLogData = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchLogProgress());
    acitivityLogsAPI(
      reqBody,
      processResponseLogs(dispatch),
      onSuccessLogs(dispatch),
      onErrorLogs(dispatch)
    );
  };
};

export { fetchLogData };
