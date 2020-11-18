import React, { useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { OrderSummaryItem } from "./orderSummaryItem";
import { CartItem } from "./cartItem";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

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
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItems: {
    color: "#010B13",
  },
  ListItemRoot: {
    width: "100%",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
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
  addComponentLeft: {
    border: "1px solid",
    borderRadius: "50% 0 0 50%",
    borderRight: "none",
    "& button": {
      padding: "3px 0 3px 5px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addComponentCenter: {
    border: "1px solid",
    borderRight: "none",
    borderLeft: "none",
    "& p": {
      width: "22px",
      height: "22px",
      display: "block",
      lineHeight: "22px",
      textAlign: "center",
    },
  },
  addComponentRight: {
    border: "1px solid",
    borderRadius: "0 50% 50% 0",
    borderLeft: "none",
    "& button": {
      padding: "3px 5px 3px 0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addMorebutton: {
    width: "30%",
  },
  listItemTextHead: {
    fontSize: 16,
    fontWeight: 600,
    color: "#010B13",
  },
}));

const OrderSummary = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const orderInfo = props.orderInfo;
  const [cartItems] = useState(props.products);
  const [checked, setChecked] = useState([0]);
  const ref = createRef();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAdd = () => {
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
  };

  // console.log("Order summary props", props.cartSummary);

  let upi_ids = [];
  if (orderInfo.consumer_upi.length > 0) {
    orderInfo.consumer_upi.map((value) => {
      upi_ids.push(value.upi_id);
    });
  }
  console.log("consumer_upi ", upi_ids);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <List dense disablePadding>
        {/* <ListItem dense disableGutters>
          <ListItemText
            primary="Order Items"
            classes={{ primary: classes.listItemTextHead }}
          />
          {props.modify && (
            <Button
              color="primary"
              endIcon={<ChevronRightIcon />}
              onClick={handleClickAdd}
              disabled={props.confirm}
            >
              Add more
            </Button>
          )}
        </ListItem> */}
        {cartItems.map((value) => {
          return <CartItem value={value} key={value.sku_id} modify={false} />;
        })}
      </List>
      <List disablePadding>
        <ListItemText
          primary="Order Summary"
          classes={{ primary: classes.listItemTextHead }}
        />
        <OrderSummaryItem
          title="Order Total"
          value={orderInfo.revised_order_total}
        />
        <OrderSummaryItem
          title="Cart Total"
          value={orderInfo.original_cart_total}
        />
        <OrderSummaryItem
          title="Additional Charges:"
          value={orderInfo.total_additional_fee}
          type="button"
        >
          {orderInfo.fee_details_struct &&
            orderInfo.fee_details_struct.map((value) => {
              return (
                <OrderSummaryItem
                  title={value.fee_title}
                  value={value.fee_value_without_taxes}
                  key={value.fee_type}
                />
              );
            })}
          {orderInfo.taxes && (
            <>
              <OrderSummaryItem
                title={"CGST (" + orderInfo.cgst_percentage + "%)"}
                value={orderInfo.taxes.cgst_total}
              />
              <OrderSummaryItem
                title={"SGST (" + orderInfo.sgst_percentage + "%)"}
                value={orderInfo.taxes.sgst_total}
              />
              <OrderSummaryItem
                title={"IGST (" + orderInfo.igst_percentage + "%)"}
                value={orderInfo.taxes.igst_total}
              />
            </>
          )}
        </OrderSummaryItem>
      </List>
      <Divider />
      <List>
        <OrderSummaryItem title="Payment Details" value={""} type="button">
          <OrderSummaryItem title="Mode of Payment:" value="-" />
          <OrderSummaryItem
            title="Wallet:"
            value={orderInfo.payment_total}
            type="button"
          >
            <OrderSummaryItem
              title="HipBar Wallet:"
              value={orderInfo.hipbar_wallet ? orderInfo.hipbar_wallet : "-"}
            />
            <OrderSummaryItem
              title="Gift Wallet:"
              value={orderInfo.gift_wallet ? orderInfo.gift_wallet : "-"}
            />
          </OrderSummaryItem>
        </OrderSummaryItem>
        <OrderSummaryItem
          title="UPI"
          value={upi_ids.length > 0 ? upi_ids.toString() : "-"}
        />
        {props.cartSummary !== null && (
          <Box>
            <Divider />
            <OrderSummaryItem
              title="Difference in Order Amount"
              value={""}
              type="button"
            >
              <OrderSummaryItem
                title="Total Order Difference:"
                value={
                  props.cartSummary
                    ? props.cartSummary.display_details[0].display_value
                    : "-"
                }
              />
              <OrderSummaryItem
                title="Cart Difference:"
                value={
                  props.cartSummary
                    ? props.cartSummary.display_details[1].display_value
                    : "-"
                }
              />
              <OrderSummaryItem
                title="Additional Charges:"
                value=""
                type="button"
              >
                <OrderSummaryItem
                  title="Delivery Charges:"
                  value={
                    props.cartSummary
                      ? props.cartSummary.display_details[2].display_value
                      : "-"
                  }
                />
                <OrderSummaryItem
                  title="Other Charges:"
                  value={
                    props.cartSummary
                      ? props.cartSummary.display_details[3].display_value
                      : "-"
                  }
                />
              </OrderSummaryItem>
            </OrderSummaryItem>
            <Divider />
            <ListItem
              classes={{ root: classes.ListItemRoot }}
              dense
              disableGutters
              button={true}
              onClick={handleClick}
              ref={ref}
            >
              <ListItemText
                primary="To Debit"
                className={classes.ListItemRootTitle}
                classes={{ root: classes.ListItemRootTitle }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ListItem
                classes={{ root: classes.ListItemRoot }}
                dense
                disableGutters
                onClick={handleToggle("hipbarWallet")}
              >
                {props.modify && (
                  <ListItemIcon>
                    {props.cartSummary ? (
                      props.cartSummary.hipbar_wallet.is_wallet_enabled ? (
                        <CheckBoxIcon color="primary" />
                      ) : (
                        <CheckBoxOutlineBlankIcon color="primary" />
                      )
                    ) : (
                      <CheckBoxOutlineBlankIcon color="primary" />
                    )}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="HipBar Wallet:"
                  secondary="Current Balance"
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
                <ListItemText
                  primary={
                    props.cartSummary
                      ? props.cartSummary.hipbar_wallet.display_charged_credits
                      : "-"
                  }
                  secondary={
                    props.cartSummary
                      ? props.cartSummary.hipbar_wallet
                          .display_available_credits
                      : "-"
                  }
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextValue }}
                />
              </ListItem>
              <ListItem
                classes={{ root: classes.ListItemRoot }}
                dense
                disableGutters
              >
                {props.modify && (
                  <ListItemIcon>
                    {props.cartSummary ? (
                      props.cartSummary.gift_wallet.is_wallet_enabled ? (
                        <CheckBoxIcon color="primary" />
                      ) : (
                        <CheckBoxOutlineBlankIcon color="primary" />
                      )
                    ) : (
                      <CheckBoxOutlineBlankIcon color="primary" />
                    )}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary="Gift Wallet:"
                  secondary="Current Balance"
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
                <ListItemText
                  primary={
                    props.cartSummary
                      ? props.cartSummary.gift_wallet.display_charged_credits
                      : "-"
                  }
                  secondary={
                    props.cartSummary
                      ? props.cartSummary.gift_wallet.display_available_credits
                      : "-"
                  }
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextValue }}
                />
              </ListItem>
            </Collapse>
            <OrderSummaryItem
              title="To Pay:"
              value={
                props.cartSummary
                  ? props.cartSummary.display_details[4].display_value
                  : "-"
              }
            />
          </Box>
        )}
      </List>
    </Box>
  );
};

OrderSummary.propTypes = {
  orderInfo: PropTypes.object,
  fetchGenre: PropTypes.func,
  modify: PropTypes.bool,
  products: PropTypes.array,
  cartSummary: PropTypes.object,
};

export { OrderSummary };
