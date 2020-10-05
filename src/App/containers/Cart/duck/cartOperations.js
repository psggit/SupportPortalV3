import {
  fetchOrderSuccess,
  fetchOrderFailed,
  fetchOrderProgress,
} from "./actions";
import { genresAPI } from "../../../utils";

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

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchOrderFailed());
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

export { fetchGenre };
