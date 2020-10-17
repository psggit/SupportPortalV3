import {
  fetchGenreSuccess,
  fetchGenreFailed,
  fetchGenreProgress,
  fetchBrandSuccess,
  fetchBrandFailed,
  fetchBrandProgress,
  updateFromCart,
} from "./actions";
import { genresAPI, brandsAPI } from "../../../utils";

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
    dispatch(fetchGenreSuccess(data));
  };
};

const onError = (dispatch) => {
  return (err) => {
    dispatch(fetchGenreFailed(err));
  };
};

const fetchGenre = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchGenreProgress());
    genresAPI(
      reqBody,
      processResponse(dispatch),
      onSuccess(dispatch),
      onError(dispatch)
    );
  };
};

const onSuccessBrand = (dispatch) => {
  return (data) => {
    dispatch(fetchBrandSuccess(data));
  };
};

const onErrorBrand = (dispatch) => {
  return (err) => {
    dispatch(fetchBrandFailed(err));
  };
};

const fetchBrand = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchBrandProgress()),
      brandsAPI(
        reqBody,
        processResponse(dispatch),
        onSuccessBrand(dispatch),
        onErrorBrand(dispatch)
      );
  };
};

const setCart = (products) => {
  return (dispatch) => {
    let newObj = {};
    // console.log(products, dispatch);
    products.map((value) => {
      newObj[value.sku_id] = value;
    });
    dispatch(updateFromCart(newObj));
  };
};

export { fetchGenre, fetchBrand, setCart };
