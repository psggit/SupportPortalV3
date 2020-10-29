import { connect } from "react-redux";
import { CartModificationComponent } from "./CartModificationComponent";
import {
  fetchGenre,
  fetchBrand,
  setCart,
  addSkuToCart,
  removeSkuFromCart,
  fetchBrandPagination,
} from "./duck";

const mapStateToProps = (state) => {
  return {
    orderId: state.home.orderId,
    cartProducts: state.cartModify.cartProducts,
    modifySuccess: state.cartModify.modifySuccess,
    fetchGenreProgress: state.cartModify.fetchGenreProgress,
    fetchGenreFailed: state.cartModify.fetchGenreFailed,
    fetchGenreSuccess: state.cartModify.fetchGenreSuccess,
    fetchBrandSuccess: state.cartModify.fetchBrandSuccess,
    fetchBrandProgress: state.cartModify.fetchBrandProgress,
    fetchBrandFailed: state.cartModify.fetchBrandFailed,
    genreData: state.cartModify.genreData,
    brandData: state.cartModify.brandData,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  return {
    fetchGenre: (payload) => dispatch(fetchGenre(payload)),
    fetchBrand: (payload) => dispatch(fetchBrand(payload)),
    setCart: (products) => dispatch(setCart(products)),
    addSkuToCart: (sku) => dispatch(addSkuToCart(sku)),
    removeSkuFromCart: (sku) => dispatch(removeSkuFromCart(sku)),
    fetchBrandPagination: (payload) => dispatch(fetchBrandPagination(payload)),
  };
};

const CartModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartModificationComponent);

export { CartModificationContainer };
