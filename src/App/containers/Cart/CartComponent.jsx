import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CartDetailsCard from "../../components/card";
import { OrderSummary } from "../Cart/components/orderSummary";
import Alert from "@material-ui/lab/Alert";
import ErrorMsg from "../../components/errorMsg";
import uuid from "react-uuid";
import { Button } from "@material-ui/core";
import Loading from "../../components/loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
    fontFamily: theme.typography.fontFamily,
  },
  CartComponent: {
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItemRoot: {
    width: "100%",
    fontSize: 16,
    color: "#606060",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
    textAlign: "right",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  buttonDiv: {
    textAlign: "right",
    justifyContent: "space-between",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionContainer: {
    padding: 0,
  },
  marginLeft: {
    marginLeft: "auto",
  },
}));

const CartComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const orderInfo = props.orderInfo;
  let cardFooter = "";
  const [modify, setModify] = useState(false);
  const [disableModify, setDisableModify] = useState(props.buttonState);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [show, setShow] = useState(true);
  const [message, showMessage] = useState();
  const cartProducts = JSON.parse(sessionStorage.getItem("modifiedCart"));
  const [cartModifyStatus, setCartModifyStatus] = useState(null);
  const [checkedHBWallet, setCheckedHBWallet] = useState(false);
  const [checkedGiftWallet, setCheckedGiftWallet] = useState(false);
  const [hbError, setHBError] = useState(null);
  const [gwError, setGWError] = useState(null);

  const handleGiftWallet = (value) => {
    setCheckedGiftWallet(value);
    if (value === true) {
      if (
        props.cartSummary.hipbar_wallet.available_credits >
        props.cartSummary.hipbar_wallet.available_limit
      ) {
        setHBError(true);
      } else {
        setHBError(null);
      }
    }
  };

  const handleHBWallet = (value) => {
    setCheckedHBWallet(value);
    if (value === true) {
      if (
        props.cartSummary.gift_wallet.available_credits >
        props.cartSummary.gift_wallet.available_limit
      ) {
        setHBError(true);
      } else {
        setHBError(null);
      }
    }
  };

  useEffect(() => {
    // check pending modify request
    let payload = {
      pending_request: true,
      completed_request: false,
      order_id: `${props.orderInfo.order_id}`,
      limit: 10,
      offset: 0,
    };
    if (
      localStorage.getItem("x-hasura-role") !== "ops_delivery_manager" &&
      localStorage.getItem("x-hasura-role") !== "support_person"
    ) {
      props.validateCart(payload);
    }

    if (JSON.parse(sessionStorage.getItem("modifyCartInfo")) !== null) {
      let cartItem = [];
      let modifiedCartProducts = JSON.parse(
        sessionStorage.getItem("modifiedCart")
      );

      Object.keys(modifiedCartProducts).forEach((value) => {
        cartItem.push({
          sku_id: parseInt(value),
          count: modifiedCartProducts[value].ordered_count,
        });
      });

      let summaryPayload = {
        order_id: orderInfo.order_id,
        is_hw_enabled: true,
        is_gw_enabled: true,
        items: cartItem,
      };
      props.fetchSummary(summaryPayload);
    }

    if (typeof history.location.state !== "undefined") {
      setCartModifyStatus(history.location.state.mode);
    } else {
      sessionStorage.setItem("mode", null);
      sessionStorage.setItem("modifyCartInfo", null);
      sessionStorage.setItem("modifiedCart", null);
      setCartModifyStatus(null);
    }

    return () => {
      sessionStorage.setItem("mode", null);
      sessionStorage.setItem("modifyCartInfo", null);
      sessionStorage.setItem("modifiedCart", null);
      setCartModifyStatus(null);
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    if (props.fetchCartSummarySuccess) {
      setCartModifyStatus("cartModified");
      modifyState = props.cartSummary.to_show_confirm;
      showMessage(props.cartSummary.action_title);
      setModify(true);
      setDisableModify(modifyState);
      setCheckedGiftWallet(props.cartSummary.gift_wallet.is_wallet_enabled);
      setCheckedHBWallet(props.cartSummary.hipbar_wallet.is_wallet_enabled);
    } else {
      setCartModifyStatus(null);
    }
  }, [props.fetchCartSummarySuccess]);

  const handleModify = () => {
    let sessionItems = JSON.parse(sessionStorage.getItem("modifiedCart"));
    let cartItems = [];
    if (sessionItems !== null) {
      Object.keys(sessionItems).forEach((value) => {
        cartItems.push(sessionItems[value]);
      });
    } else {
      cartItems = null;
    }
    history.push({
      pathname: "/cart-modify",
      state: {
        retailerId: orderInfo.retailer_id,
        retailer_name: orderInfo.retailer_name,
        city_id: orderInfo.city_id,
        state_id: orderInfo.state_id,
        gps: orderInfo.gps,
        orderId: orderInfo.order_id,
        products: orderInfo.cart_items,
        previousCart: cartItems,
      },
    });
    sessionStorage.setItem("modifyCartInfo", null);
    sessionStorage.setItem("modifiedCart", null);
  };

  const handleCancel = () => {
    sessionStorage.setItem("mode", null);
    sessionStorage.setItem("modifyCartInfo", null);
    sessionStorage.setItem("modifiedCart", null);
    setCartModifyStatus(null);
    setModify(false);
    setCancel(true);
    setShow(false);
  };

  const handleConfirm = () => {
    let summaryPayload = {
      ...props.modifyCart,
      is_hw_enabled: checkedHBWallet,
      is_gw_enabled: checkedGiftWallet,
      order_id: orderInfo.order_id,
    };
    // console.log("summaryPayload", summaryPayload);
    props.updateCart(summaryPayload);
    setConfirm(!confirm);
    setTimeout(() => {
      sessionStorage.setItem("mode", null);
      sessionStorage.setItem("modifyCartInfo", null);
      sessionStorage.setItem("modifiedCart", null);
      location.reload();
    }, 2500);
  };

  const routePage = () => {
    history.push({
      pathname: "/modification-list",
      state: {
        orderId: orderInfo.order_id,
      },
    });
  };

  let actionButtons = [
    <Button
      variant="contained"
      color="primary"
      onClick={handleModify}
      key={uuid()}
      //disabled={disableModify}
      disabled={!props.orderInfo.change_retailer_button}
    >
      Modify
    </Button>,
  ];

  const returnModifiedCartItems = () => {
    let newArray = [];
    for (const key in cartProducts) {
      const item = cartProducts[key];
      const revised_item = {
        brand_id: item.brand_id,
        brand_name: item.brand_name,
        deliverable_count: item.ordered_count,
        message: item.message !== undefined ? item.message : "",
        ordered_count: item.ordered_count,
        revised_count: item.revised_count,
        revised_total_price: item.revised_total_price,
        sku_id: item.sku_id,
        sku_price: item.sku_price,
        total_price: item.total_price,
        volume: item.volume,
      };
      newArray.push(revised_item);
    }

    return newArray;
  };

  if (
    (props.fetchCartSummarySuccess && props.cartSummary === null) ||
    (props.validateOrderSuccess && props.validateInfo.count !== 0)
  ) {
    actionButtons = null;
    cardFooter = (
      <Alert severity="warning">
        This order already has an <b>Order Modification</b> request.
        <br />
        <br />
        Go to{" "}
        <u style={{ color: "blue", cursor: "pointer" }}>
          <div onClick={routePage}>Order Modificaton</div>
        </u>{" "}
        page or Last Modification Details section below to cancel the previous
        request.
      </Alert>
    );
  }

  if (
    props.cartSummary !== null &&
    props.cartSummary.action === "nothing" &&
    show === true
  ) {
    cardFooter = <Alert severity="info">{message}</Alert>;
  }
  if (
    props.cartSummary !== null &&
    show === true &&
    props.cartSummary.action !== "nothing"
  ) {
    actionButtons = [
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        className={classes.marginLeft}
        key={uuid()}
        disabled={confirm}
      >
        Cancel
      </Button>,
      <Button
        variant="outlined"
        color="primary"
        onClick={handleModify}
        key={uuid()}
        //disabled={disableModify}
        disabled={!props.orderInfo.change_retailer_button}
      >
        Add More
      </Button>,
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        key={uuid()}
        disabled={confirm}
      >
        Confirm
      </Button>,
    ];
  }
  let modifyState = modify;
  let cartItems = props.products;
  if (cartModifyStatus === "cartModified") {
    cartItems = returnModifiedCartItems();
  }

  if (props.fetchCartSummaryProgress) {
    <Loading message="Fetching data..." />;
  }

  return (
    <>
      <CartDetailsCard
        title="Cart Details"
        actions={actionButtons}
        id="order-details"
        cardFooter={cardFooter}
      >
        <OrderSummary
          {...props}
          modifiedProducts={cartItems}
          modify={modifyState}
          cartSummary={props.cartSummary}
          confirm={confirm}
          show={show}
          checkedHBWallet={checkedHBWallet}
          checkedGiftWallet={checkedGiftWallet}
          setCheckedHBWallet={setCheckedHBWallet}
          setCheckedGiftWallet={setCheckedGiftWallet}
          handleGiftWallet={handleGiftWallet}
          handleHBWallet={handleHBWallet}
        />
      </CartDetailsCard>
      {(props.fetchUpdateCartSuccess || props.fetchUpdateCartFailed) && (
        <ErrorMsg
          message={props.msg}
          show={true}
          type={props.fetchUpdateCartSuccess ? "success" : "info"}
        />
      )}
      {props.fetchCartSummaryFailed && (
        <ErrorMsg message={props.errorMsg} show={true} type="error" />
      )}
    </>
  );
};

CartComponent.propTypes = {
  orderInfo: PropTypes.object,
  order: PropTypes.any,
  modifyCart: PropTypes.any,
  buttonState: PropTypes.bool,
  fetchSummary: PropTypes.func,
  updateCart: PropTypes.func,
  cartSummary: PropTypes.any,
  fetchCartSummarySuccess: PropTypes.bool,
  fetchUpdateCartSuccess: PropTypes.bool,
  fetchUpdateCartFailed: PropTypes.bool,
  validateOrderSuccess: PropTypes.bool,
  validateCart: PropTypes.func,
  validateInfo: PropTypes.any,
  cancelCart: PropTypes.func,
  resetOnUnmount: PropTypes.func,
  msg: PropTypes.string,
  errorMsg: PropTypes.string,
  fetchCartSummaryFailed: PropTypes.bool,
};

export { CartComponent };
