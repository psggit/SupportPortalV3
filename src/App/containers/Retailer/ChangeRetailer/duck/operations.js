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
      throw res;
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
  return (data) => {
    data.json().then((json) => {
      dispatch(reassignRetailerFailed(json));
    });
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
