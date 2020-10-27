import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CartDetailsCard from "../../components/card";
import { OrderSummary } from "../Cart/components/orderSummary";

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
  useEffect(() => {
    console.log("Cart Component", props.modifyCart);
    if (props.modifyCart !== undefined) {
      props.fetchSummary(props.modifyCart);
    }
  }, []);
  const classes = useStyles();
  const [modify, setModify] = useState(false);

  let modifyState = modify;
  const handleModify = () => {
    setModify(!modify);
  };

  const handleCancel = () => {
    setModify(!modify);
  };

  const handleConfirm = () => {
    props.updateCart(props.modifyCart);
    setModify(!modify);
  };

  let actionButtons = [
    <Button
      variant="contained"
      color="primary"
      onClick={handleModify}
      key="modifyBtn"
    >
      Modify
    </Button>,
  ];

  if (modify) {
    actionButtons = [
      <Button
        variant="outlined"
        color="primary"
        onClick={handleCancel}
        className={classes.marginLeft}
        key="cancelBtn"
      >
        Cancel
      </Button>,
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirm}
        key="confirmBtn"
      >
        Confirm
      </Button>,
    ];
  }

  useEffect(() => {
    if (props.fetchGenreSuccess) {
      console.log("cartSummary summary");
      console.log(props.cartSummary);
      modifyState = props.cartSummary.to_show_confirm;
      handleModify();
    }
  }, [props.fetchGenreSuccess]);

  console.log(props.cartSummary);

  return (
    <>
      <CartDetailsCard
        title="Cart Details"
        actions={actionButtons}
        id="order-details"
      >
        <OrderSummary
          {...props}
          modify={modifyState}
          orderSummary={props.cartSummary}
        />
      </CartDetailsCard>
    </>
  );
};

CartComponent.propTypes = {
  orderInfo: PropTypes.object,
  order: PropTypes.any,
  modifyCart: PropTypes.any,
  fetchSummary: PropTypes.func,
  updateCart: PropTypes.func,
  cartSummary: PropTypes.any,
  fetchGenreSuccess: PropTypes.bool,
};

export { CartComponent };
