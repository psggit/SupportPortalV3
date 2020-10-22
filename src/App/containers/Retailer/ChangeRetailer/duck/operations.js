import {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
} from "./action";
import { listRetailerAPI } from "../../../../utils/listRetailerAPI";

const processResponse = () => {
  return (res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error("Something went wrong, try again");
    }
  };
};

const onSuccessListRetailer = (dispatch) => {
  return (data) => {
    dispatch(listRetailerSuccess(data));
  };
};

const onErrorListRetailer = (dispatch) => {
  return () => {
    dispatch(listRetailerFailed());
  };
};

const listRetailer = (reqBody) => {
  return (dispatch) => {
    dispatch(listRetailerProgress());
    listRetailerAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessListRetailer(dispatch),
      onErrorListRetailer(dispatch)
    );
  };
};

export { listRetailer };
