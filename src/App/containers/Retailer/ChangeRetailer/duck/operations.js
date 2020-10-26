import {
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
  reassignRetailerProgress,
  reassignRetailerFailed,
  reassignRetailerSuccess,
} from "./action";
import { listRetailerAPI } from "../../../../utils/listRetailerAPI";
import { reassignRetailerAPI } from "../../../../utils/reassignRetailerAPI";

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

const onSuccessReassignRetailer = (dispatch) => {
  return (data) => {
    dispatch(reassignRetailerSuccess(data));
  };
};

const onErrorListRetailer = (dispatch) => {
  return () => {
    dispatch(listRetailerFailed());
  };
};

const onErrorReassignRetailer = (dispatch) => {
  return () => {
    dispatch(reassignRetailerFailed());
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

const reassignRetailer = (reqBody) => {
  return (dispatch) => {
    dispatch(reassignRetailerProgress());
    reassignRetailerAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessReassignRetailer(dispatch),
      onErrorReassignRetailer(dispatch)
    );
  };
};

export { listRetailer, reassignRetailer };
