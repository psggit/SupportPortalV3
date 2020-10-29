import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CartDetailsCard from "../../components/card";
import { OrderSummary } from "../Cart/components/orderSummary";
import Alert from "@material-ui/lab/Alert";
import ErrorMsg from "../../components/errorMsg";

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
  const [modify, setModify] = useState(false);
  const [disableModify, setDisableModify] = useState(props.buttonState);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  useEffect(() => {
    // check pending modify request
    let payload = {
      pending_request: true,
      completed_request: false,
      order_id: `${props.orderInfo.order_id}`,
      limit: 10,
      offset: 0,
    };
    props.validateCart(payload);
  }, []);

  useEffect(() => {
    if (props.validateOrderSuccess) {
      // if (props.validateInfo.count == 0) {
      // if (props.modifyCart.length !== 0 && props.modifyCart !== undefined) {
      // }
      // }
      if (!cancel) {
        props.fetchSummary(props.modifyCart);
      }

      if (props.validateInfo.count !== 0) {
        setDisableModify(true);
      }
    }
  }, [props.validateOrderSuccess]);

  useEffect(() => {
    if (props.fetchCartSummarySuccess) {
      modifyState = props.cartSummary.to_show_confirm;
      setModify(!modify);
      setDisableModify(modifyState);
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
    // history.replaceState(props.location.pathname, null);
  };

  const handleCancel = () => {
    setModify(false);
    setCancel(true);
  };

  const handleConfirm = () => {
    props.updateCart(props.modifyCart);
    setConfirm(!confirm);
  };

  let actionButtons = [
    <Button
      variant="contained"
      color="primary"
      onClick={handleModify}
      key="modifyBtn"
      disabled={disableModify}
    >
      Modify
    </Button>,
  ];

  let cardFooter = "";
  if (props.validateOrderSuccess && props.validateInfo.count !== 0) {
    cardFooter = (
      <Alert severity="warning">
        This order already has an <b>Order Modification</b> request.
      </Alert>
    );
  }

  if (modify && props.validateInfo.count == 0) {
    actionButtons = [
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        className={classes.marginLeft}
        key="cancelBtn"
        disabled={confirm}
      >
        Cancel
      </Button>,
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        key="confirmBtn"
        disabled={confirm}
      >
        Confirm
      </Button>,
    ];
  }
  let modifyState = modify;
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
          modify={modifyState}
          cartSummary={props.cartSummary}
          confirm={confirm}
        />
      </CartDetailsCard>
      {props.fetchUpdateCartSuccess ||
        (props.fetchUpdateCartFailed && (
          <ErrorMsg message={props.msg} show={true} type="info" />
        ))}
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
  msg: PropTypes.string,
};

export { CartComponent };
