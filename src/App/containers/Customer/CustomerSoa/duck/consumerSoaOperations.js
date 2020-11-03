import {
  fetchCustomerSoaSuccessfull,
  fetchCustomerSoaFailure,
  fetchCustomerSoaInProgress,
} from "./actions";
import { consumerSoaAPI } from "../../../../utils/consumerSoaAPI";

// const processResponse = () => {
//   return (res) => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error("Something went wrong......");
//     }
//   };
// };

// const processResponse = () => {
//   return (res) => {
//     if (res.status === 200) {
//       //console.log("response-soa", res.json());
//       return res.json();
//     } else if (res.status === 400) {
//       //console.log("response-soa-fail", res.json());
//       console.log(
//         "error",
//         res.json().then((json) => json.message)
//       );
//       throw new Error("Something went wrong! Please contact tech");
//     } else {
//       throw new Error("Something went wrong, try again");
//     }
//   };
// };

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
  return (data) => {
    data.json().then((json) => {
      dispatch(fetchCustomerSoaFailure(json));
    });
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
