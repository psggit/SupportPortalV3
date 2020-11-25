import {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
} from "./actions";
import { consumerRewardsAPI } from "../../../../utils/consumerRewardsAPI";

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
    dispatch(fetchRewardSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchRewardFailure(error));
  };
};

const fetchRewardsList = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchRewardProgress());
    consumerRewardsAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchRewardsList };
