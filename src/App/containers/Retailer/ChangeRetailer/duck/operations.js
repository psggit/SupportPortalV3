import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
  listRetailerSuccess,
  listRetailerFailed,
  listRetailerProgress,
} from "./action";
import { genresAPI } from "../../../../utils";
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

const onSuccess = (dispatch) => {
  return (data) => {
    dispatch(fetchOrderSuccess(data));
  };
};

const onSuccessListRetailer = (dispatch) => {
  return (data) => {
    dispatch(listRetailerSuccess(data));
  };
};

const onError = (dispatch) => {
  return () => {
    dispatch(fetchOrderFailed());
  };
};

const onErrorListRetailer = (dispatch) => {
  return () => {
    dispatch(listRetailerFailed());
  };
};

const fetchGenre = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchOrderProgress());
    genresAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
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

export { fetchGenre, listRetailer };
