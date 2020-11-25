const defaultError = "Default Error: Something went wrong. Try again later.";
// const defaultError400 =
//   "Default Error 400: Invalid params. Something went wrong. Try again later.";
// const defaultError500 =
//   "Default Error 500: Something went wrong. Try again later.";

export const setErrorMessage = (data) => {
  return typeof data.payload.message === "undefined"
    ? defaultError
    : data.payload.message;
};
