import {
  fetchCustomerSuccessfull,
  fetchCustomerFailure,
  fetchCustomerInProgress,
} from "./actions";


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
    dispatch(fetchCustomerSuccessfull(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchCustomerFailure(error));
  };
};

const fetchCustomerDetail = () => {
  let reqBody = {
    order_id: '50011495496288'
  };
  return (dispatch) => {
    dispatch(fetchCustomerInProgress);
    loginAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

export { fetchCustomerDetail }
