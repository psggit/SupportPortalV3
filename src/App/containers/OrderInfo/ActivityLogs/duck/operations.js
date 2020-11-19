import { fetchLogProgress, fetchLogFailed, fetchLogSuccess } from "./actions";
import { acitivityLogsAPI } from "../../../../utils";

const processResponseLogs = () => {
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
