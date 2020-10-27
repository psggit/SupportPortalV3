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
  listItemTextHead: {
    fontSize: 16,
    fontWeight: 600,
    color: "#010B13",
  },
}));

const BlueCheckbox = withStyles({
  root: {
    color: "#0086AD",
    "&$checked": {
      color: "#0086AD",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    // history.push("/cart-modify");
    // console.clear();
    // console.log("clickAdd ", orderInfo);
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

  console.log("Order summary props", props);

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
            classes={{ primary: classes.listItemTextHead }}
          />
          {props.modify && (
            <Button
              color="primary"
              endIcon={<ChevronRightIcon />}
              onClick={handleClickAdd}
            >
              Add more
            </Button>
          )}
        </ListItem>
        {cartItems.map((value) => {
          return <CartItem value={value} key={value.sku_id} modify={false} />;
        })}
      </List>
      <List disablePadding>
        {/* {<OrderSummaryItem title="Order Summary" value={""} />} */}
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
          {orderInfo.fee_details_struct.map((value) => {
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
                value={orderInfo.taxes.igst}
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
              value={orderInfo.gift_wallet}
            />
          </OrderSummaryItem>
        </OrderSummaryItem>
        <OrderSummaryItem
          title="UPI"
          value={
            orderInfo.consumer_upi.length === 1
              ? orderInfo.consumer_upi[0].upi_id
              : "-"
          }
        />
        <Divider />
        <OrderSummaryItem
          title="Difference in Order Amount"
          value={""}
          type="button"
        >
          <OrderSummaryItem title="Total Order Difference:" value={"-"} />
          <OrderSummaryItem title="Cart Difference:" value={"-"} />
          <OrderSummaryItem
            title="Additional Charges:"
            value={orderInfo.total_additional_fee}
            type="button"
          ></OrderSummaryItem>
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
                <BlueCheckbox
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
                <BlueCheckbox
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
        <OrderSummaryItem title="To Pay:" value={orderInfo.payment_total} />
      </List>
    </Box>
  );
};

OrderSummary.propTypes = {
  orderInfo: PropTypes.object,
  fetchGenre: PropTypes.func,
  modify: PropTypes.bool,
  products: PropTypes.array,
};

export { OrderSummary };
