import { connect } from "react-redux";
import { CartModificationComponent } from "./CartModificationComponent";
import { fetchGenre, setCart } from "./duck";

const mapStateToProps = (state) => {
  // console.log("mapStateToProps");
  // console.log(state);
  return {
    orderId: state.home.orderId,
    products: state.order.orderInfo.products,
    modifiedProducts: state.cartModify.modifiedProducts,
    modifySuccess: state.cartModify.modifySuccess,
    // retailerId: state.order.orderInfo.orderDetails.retailer_id,
    // retailer_name: state.order.orderInfo.orderDetails.retailer_name,
    // city_id: state.order.orderInfo.orderDetails.city_id,
    // state_id: state.order.orderInfo.orderDetails.state_id,
    // gps: state.order.orderInfo.orderDetails.gps,
    // fetchGenreProgress: state.cartModify.fetchGenreProgress,
    // fetchGenreFailed: state.cartModify.fetchGenreFailed,
    // fetchGenreSuccess: state.cartModify.fetchGenreSuccess,
    // genreData: state.cartModify.genreData,
    // brandData: state.cartModify.brandData,
  };
};

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  return {
    fetchGenre: (payload) => dispatch(fetchGenre(payload)),
    setCart: (products) => dispatch(setCart(products)),
  };
};

const CartModificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartModificationComponent);

export { CartModificationContainer };
