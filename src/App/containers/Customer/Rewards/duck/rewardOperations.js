import {
  fetchRewardSuccess,
  fetchRewardFailure,
  fetchRewardProgress,
} from "./actions";
import { consumerRewardsAPI } from "../../../../utils/consumerRewardsAPI";

const processResponse = () => {
  // console.clear();
  // console.log("[processResponse]");
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      console.log(
        "error",
        res.json().then((json) => json.message)
      );
      throw new Error("Check Parameters.");
    }
  };
};

const onSuccess = (dispatch) => {
  console.log("[onSuccess]");
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
  // console.clear();
  // console.clear("fetchCustomerSoaList");
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
