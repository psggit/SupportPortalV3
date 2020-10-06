import {
  fetchNotesSuccess,
  fetchNotesFailed,
  fetchNotesProgress,
} from "./actions";
import { fetchNotesAPI } from "../../../../utils/fetchNotesAPI"


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
    dispatch(fetchNotesSuccess(data));
  };
};

const onError = (dispatch) => {
  return (error) => {
    dispatch(fetchNotesFailed(error));
  };
};

const sendOrderId = (orderId) => {
  let reqBody = {
    order_id: orderId,
    type: "customer",
  };
  return (dispatch) => {
    dispatch(fetchNotesProgress());
    fetchNotesAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

// const fetchCustomerNotes = (reqBody) => {
//   let reqBody = {
//     order_id: '5001142475423'
//   };
//   return (dispatch) => {
//     dispatch(fetchCustomerNotesInProgress());
//     fetchNotesAPI(
//       reqBody,
//       processResponse(dispatch),
//       onSuccess(dispatch),
//       onError(dispatch)
//     );
//   };
// };

export { sendOrderId }
