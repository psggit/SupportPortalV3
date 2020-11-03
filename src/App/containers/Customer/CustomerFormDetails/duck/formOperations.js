import {
  consumerUpdateSuccess,
  consumerUpdateFailed,
  consumerUpdateProgress,
} from "./actions";
import { consumerUpdateAPI } from "../../../../utils/consumerUpdateAPI";

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
    dispatch(consumerUpdateSuccess(data));
  };
};

const onError = (dispatch) => {
  return (data) => {
    data.json().then((json) => {
      dispatch(consumerUpdateFailed(json));
    });
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
