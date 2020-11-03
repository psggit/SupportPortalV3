import {
  fetchGiftSoaSuccess,
  fetchGiftSoaFailure,
  fetchGiftSoaProgress,
} from "./actions";
import { consumerGiftSoaAPI } from "../../../../utils/consumerGiftSoaAPI";

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
    dispatch(fetchGiftSoaSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchGiftSoaFailure(error));
  };
};

const fetchGiftSoaList = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchGiftSoaProgress());
    consumerGiftSoaAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchGiftSoaList };
