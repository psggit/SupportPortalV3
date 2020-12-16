import {
  fetchHipcoinSoaSuccess,
  fetchHipcoinSoaFailure,
  fetchHipcoinSoaProgress,
} from "./actions";
import { hipcoinSoaAPI } from "../../../../utils/hipcoinSoaAPI";

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
    dispatch(fetchHipcoinSoaSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchHipcoinSoaFailure(error));
  };
};

const fetchHipcoinSoaList = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchHipcoinSoaProgress());
    hipcoinSoaAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchHipcoinSoaList };
