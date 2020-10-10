// import {
//   fetchCustomerSoaSuccessfull,
//   fetchCustomerSoaFailure,
//   fetchCustomerSoaInProgress,
// } from "./actions";

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
//     dispatch(fetchCustomerSoaSuccessfull(data));
//   };
// };

// const onError = (dispatch) => {
//   return (error) => {
//     dispatch(fetchCustomerSoaFailure(error));
//   };
// };

// const fetchCustomerSoaDetail = () => {
//   let reqBody = {};
//   return (dispatch) => {
//     dispatch(fetchCustomerSoaInProgress);
//     loginAPI(
//       reqBody,
//       processResponse(dispatch),
//       onSuccess(dispatch),
//       onError(dispatch)
//     );
//   };
// };

// export { fetchCustomerSoaDetail };
