import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CartDetailsCard from "../../components/card";
import { OrderSummary } from "../Cart/components/orderSummary";
import Alert from "@material-ui/lab/Alert";
import ErrorMsg from "../../components/errorMsg";
import uuid from "react-uuid";
import { Button } from "@material-ui/core";

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
  // eslint-disable-next-line no-unused-vars
  const [disableModify, setDisableModify] = useState(props.buttonState);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [show, setShow] = useState(true);
  const [message, showMessage] = useState();
  const cartProducts = JSON.parse(localStorage.getItem("modifiedCart"));
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

    return () => {
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    if (props.fetchCartSummarySuccess) {
      localStorage.setItem("mode", "cartModified");
      modifyState = props.cartSummary.to_show_confirm;
      showMessage(props.cartSummary.action_title);
      setModify(!modify);
      setDisableModify(modifyState);
    }else{
      localStorage.setItem("mode", null);
      localStorage.setItem("modifyCartInfo", null);
      localStorage.setItem("modifiedCart", null);
    }
  }, [props.fetchCartSummarySuccess]);

  const handleModify = () => {
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
      },
    });
    localStorage.setItem("modifyCartInfo", null);
    localStorage.setItem("modifiedCart", null);
  };

  const handleCancel = () => {
    localStorage.setItem("mode", null);
    localStorage.setItem("modifyCartInfo", null);
    localStorage.setItem("modifiedCart", null);
    setModify(true);
    setCancel(true);
    setShow(false);
  };

  const handleConfirm = () => {
    props.updateCart(props.modifyCart);
    setConfirm(!confirm);
    setTimeout(() => {
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
    cardFooter = (
      <Alert severity="warning">
        This order already has an <b>Order Modification</b> request.
        <br />
        <br />
        Go to{" "}
        <u style={{ color: "blue", cursor: "pointer" }}>
          <div onClick={routePage}>Order Modificaton</div>
        </u>{" "}
        page to cancel the previous request.
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
  console.log(localStorage.getItem("mode"), modify);
  if (localStorage.getItem("mode") === "cartModified") {
    cartItems = returnModifiedCartItems();
    console.log("modify ", modify, cartItems);
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
          products={cartItems}
          modify={modifyState}
          cartSummary={props.cartSummary}
          confirm={confirm}
          show={show}
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
