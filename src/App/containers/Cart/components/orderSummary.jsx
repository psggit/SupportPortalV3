import React, { useState, createRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { OrderSummaryItem } from "./orderSummaryItem";
import { CartItem } from "./cartItem";

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
}));

const OrderSummary = (props) => {
  const classes = useStyles();
  const orderInfo = props.orderInfo;
  const [cartItems] = useState(orderInfo.cart_items);
  const [checked, setChecked] = useState([0]);
  const ref = createRef();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickAdd = () => {
    const payload = {
      city_id: 9,
      state_id: 4,
      retailer_id: 439,
      genre_id: 6,
      gps: "11.343048726648705,77.71711483597755",
      offset: 0,
      limit: 20,
    };
    props.fetchGenre(payload);
  };

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
        <ListItem dense disableGutters>
          <ListItemText
            primary="Order Items"
            className={classes.ListItemRootTitle}
            classes={{ root: classes.ListItemRootTitle }}
          />
          {props.modify && (
            <Button
              color="primary"
              className={classes.addMorebutton}
              endIcon={<ChevronRightIcon />}
              onClick={handleClickAdd}
            >
              Add more
            </Button>
          )}
        </ListItem>
        {cartItems.map((value) => {
          return (
            <CartItem value={value} key={value.sku_id} modify={props.modify} />
          );
        })}
      </List>
      <List disablePadding>
        <ListItem dense disableGutters>
          <OrderSummaryItem title="Order Summary" value={""} />
        </ListItem>
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
          <OrderSummaryItem title="Taxes" value="Taxes charges" />
        </OrderSummaryItem>
      </List>
      <Divider />
      <List>
        <OrderSummaryItem title="Payment Details" value={""} type="button">
          <OrderSummaryItem title="Mode of Payment:" value="MISSING" />
          <OrderSummaryItem
            title="Wallet:"
            value={orderInfo.payment_total}
            type="button"
          >
            <OrderSummaryItem
              title="HipBar Wallet:"
              value={orderInfo.hipbar_wallet}
            />
            <OrderSummaryItem
              title="Gift Wallet:"
              value={orderInfo.gift_wallet}
            />
          </OrderSummaryItem>
        </OrderSummaryItem>
        <OrderSummaryItem title="UPI" value={"MISSING"} />
        <Divider />
        <OrderSummaryItem
          title="Difference in Order Amount"
          value={""}
          type="button"
        >
          <OrderSummaryItem title="Total Order Difference:" value={"MISSING"} />
          <OrderSummaryItem title="Cart Difference:" value={"MISSING"} />
          <OrderSummaryItem
            title="Additional Charges:"
            value={orderInfo.total_additional_fee}
            type="button"
          >
            {orderInfo.fee_details_struct.map((value) => {
              return (
                <OrderSummaryItem
                  title={value.fee_title}
                  value={value.fee_value_without_taxes}
                  key={value.fee_type}
                />
              );
            })}
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
            button={props.modify}
            onClick={handleToggle("hipbarWallet")}
          >
            {props.modify && (
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf("hipbarWallet") !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            )}
            <ListItemText
              primary="HipBar Wallet:"
              secondary="Current Balance"
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextLabel }}
            />
            <ListItemText
              primary={orderInfo.revised_hipbar_wallet}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextValue }}
            />
          </ListItem>
          <ListItem
            classes={{ root: classes.ListItemRoot }}
            dense
            disableGutters
            button={props.modify}
            onClick={handleToggle("giftWallet")}
          >
            {props.modify && (
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf("giftWallet") !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
            )}
            <ListItemText
              primary="Gift Wallet:"
              secondary="Current Balance"
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextLabel }}
            />
            <ListItemText
              primary={orderInfo.revised_gift_wallet}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextValue }}
            />
          </ListItem>
        </Collapse>
        <OrderSummaryItem title="To Pay:" value={"CONFIRM"} />
      </List>
    </Box>
  );
};

OrderSummary.propTypes = {
  orderInfo: PropTypes.object,
  fetchGenre: PropTypes.func,
  modify: PropTypes.bool,
};

export { OrderSummary };
