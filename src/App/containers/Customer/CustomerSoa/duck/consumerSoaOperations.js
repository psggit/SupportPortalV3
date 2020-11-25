import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
} from "./actions";
import { consumerSoaAPI } from "../../../../utils/consumerSoaAPI";

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
    dispatch(fetchCustomerSoaSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchCustomerSoaFailure(error));
  };
};

const fetchCustomerSoaList = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchCustomerSoaInProgress());
    consumerSoaAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchCustomerSoaList };
