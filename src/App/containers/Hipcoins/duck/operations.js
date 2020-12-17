import {
  fetchLoyalityPointsSuccess,
  fetchLoyalityPointsFailed,
  fetchLoyalityPointsInProgress,
} from "./action";
// import { createSession } from "../../../utils";
import { fetchLoyalityPointsAPI } from "../../../utils/fetchLoyalityPointsAPI";

const processResponse = () => {
  return (res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  };
};

const onSuccess = (dispatch) => {
  return (data) => {
    // console.log("[onSuccess] data", data);
    dispatch(fetchLoyalityPointsSuccess(data));
    // createSession(data);
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchLoyalityPointsFailed(err));
  };
};

const fetchLoyalityPoints = (payload) => {
  return (dispatch) => {
    dispatch(fetchLoyalityPointsInProgress());
    fetchLoyalityPointsAPI(
      payload,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchLoyalityPoints };
