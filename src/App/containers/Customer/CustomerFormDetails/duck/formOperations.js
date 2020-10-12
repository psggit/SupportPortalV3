import {
  consumerUpdateSuccess,
  consumerUpdateFailed,
  consumerUpdateProgress,
} from "./actions";
import { consumerUpdateAPI } from "../../../../utils/consumerUpdateAPI";

const processResponse = () => {
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
    dispatch(consumerUpdateSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(consumerUpdateFailed(error));
  };
};

const updateConsumer = (reqBody) => {
  return (dispatch) => {
    dispatch(consumerUpdateProgress);
    consumerUpdateAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { updateConsumer };
