import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
} from "./actions";
import { consumerSoaAPI } from "../../../../utils/consumerSoaAPI";

const processResponse = () => {
  console.clear();
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
    dispatch(fetchCustomerSoaSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchCustomerSoaFailure(error));
  };
};

const fetchCustomerSoaList = (reqBody) => {
  console.clear();
  console.clear("fetchCustomerSoaList");
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
