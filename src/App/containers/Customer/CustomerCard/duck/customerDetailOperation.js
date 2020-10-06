// import {
//   fetchCustomerNotesSuccessfull,
//   fetchCustomerNotesFailure,
//   fetchCustomerNotesInProgress,
// } from "./actions";
// import {fetchNotesAPI} from "../../../../utils/fetchNotesAPI"


// const processResponse = () => {
//   console.log("[processResponse]");
//   return (res) => {
//     if (res.status === 200) {
//       return res.json();
//     } else {
//       throw new Error("Something went wrong, try again");
//     }
//   };
// };

// const onSuccess = (dispatch) => {
//   console.log("[onSuccess]");
//   return (data) => {
//     dispatch(fetchCustomerNotesSuccessfull(data));
//   };
// };

// const onError = (dispatch) => {
//   return (error) => {
//     dispatch(fetchCustomerNotesFailure(error));
//   };
// };

// const fetchCustomerNotes = (reqBody) => {
//   // let reqBody = {
//   //   order_id: '50011495496288'
//   // };
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

// export { fetchCustomerNotes }
