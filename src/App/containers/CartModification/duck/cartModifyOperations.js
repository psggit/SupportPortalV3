import {
  fetchGenreSuccess,
  fetchGenreFailed,
  fetchGenreProgress,
  fetchBrandSuccess,
  fetchBrandFailed,
  fetchBrandProgress,
  brandPagination,
  updateFromCart,
  searchSuccess,
  searchFailed,
} from "./actions";
import { genresAPI, brandsAPI, searchItemsAPI } from "../../../utils";

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

const onSuccessBrandPagination = (dispatch) => {
  return (data) => {
    dispatch(brandPagination(data));
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

const fetchBrandPagination = (reqBody) => {
  return (dispatch) => {
    dispatch(fetchBrandProgress()),
      brandsAPI(
        reqBody,
        processResponse(dispatch),
        onSuccessBrandPagination(dispatch),
        onErrorBrand(dispatch)
      );
  };
};

const setCart = (products) => {
  return (dispatch) => {
    let newObj = {};
    products.map((value) => {
      newObj[value.sku_id] = value;
    });
    dispatch(updateFromCart(newObj));
  };
};

const onSuccessSearch = (dispatch) => {
  return (data) => {
    dispatch(searchSuccess(data));
  };
};

const onErrorSearch = (dispatch) => {
  return (err) => {
    dispatch(searchFailed(err));
  };
};

const searchItems = (reqBody) => {
  return (dispatch) => {
    searchItemsAPI(
      reqBody,
      processResponse(dispatch),
      onSuccessSearch(dispatch),
      onErrorSearch(dispatch)
    );
  };
};

export { fetchGenre, fetchBrand, setCart, fetchBrandPagination, searchItems };
