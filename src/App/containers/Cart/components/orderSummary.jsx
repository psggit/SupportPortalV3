/* eslint-disable react/jsx-key */
import React, { useState, createRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import {
  hipcoinIcon,promoIcon
} from "../../../assets/images";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { OrderSummaryItem } from "./orderSummaryItem";
import { CartItem } from "./cartItem";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Checkbox from "@material-ui/core/Checkbox";
import uuid from "react-uuid";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

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
    textDecoration: "line-through",
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
  hipcoinSection: {
    marginTop: "16px",
    display:"flex",
    border: "1px dashed #606060",
    borderRadius: "4px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#606060",
  },
  hipcoinIcon: {
    marginLeft: "16px",
    marginTop: "12px",
    marginBottom: "11px",
  },
  hipcoinContent: {
    marginLeft: "13px",
    marginTop: "12px",
    marginBottom: "11px",
  },
  hipcoinsGained: {
    marginTop: "16px",
    marginBottom: "24px",
    display: "flex",
    border: "1px dashed #02B133",
    borderRadius: "4px",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "22px",
    color: "#606060",
    backgroundColor: "rgba(2, 177, 51, 0.08)",
  },
}));

const OrderSummary = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const orderInfo = props.orderInfo;
  const cartItems = props.modifiedProducts;
  const [checked, setChecked] = useState([0]);

  const ref = createRef();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const returnCartItems = () => {
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

    return cartItem;
  };

  const handleChangeHipbarWallet = (event) => {
    let cartItem = returnCartItems();
    let summaryPayload = {
      order_id: orderInfo.order_id,
      is_hw_enabled: event.target.checked,
      is_gw_enabled: props.checkedGiftWallet,
      items: cartItem,
    };

    props.fetchSummary(summaryPayload);
    props.setCheckedHBWallet(event.target.checked);
  };

  const handleChangeGiftWallet = (event) => {
    let cartItem = returnCartItems();
    let summaryPayload = {
      order_id: orderInfo.order_id,
      is_hw_enabled: props.checkedHBWallet,
      is_gw_enabled: event.target.checked,
      items: cartItem,
    };

    props.fetchSummary(summaryPayload);
    props.setCheckedGiftWallet(event.target.checked);
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
        {cartItems.map((value) => {
          return <CartItem value={value} key={value.sku_id} modify={false} />;
        })}
      </List>
      {orderInfo.hipcoin_details.total_earned_text.length > 0 &&
        <div className={classes.hipcoinsGained}>
          <div className={classes.hipcoinIcon}>
            <img src={hipcoinIcon} />
          </div>
          <div className={classes.hipcoinContent}>
            <p>{orderInfo.hipcoin_details.total_earned_text}</p>
          </div>
        </div>
      }
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
          value={orderInfo.revised_cart_total}
        />
        <OrderSummaryItem
          title="Additional Charges:"
          // value={orderInfo.total_additional_fee}
          value={orderInfo.hipcoin_details.to_strikeoff_charges ? <strike>{orderInfo.total_additional_fee}</strike> : orderInfo.total_additional_fee}
          // toStrike={orderInfo.hipcoin_details.to_strikeoff_charges}
          type="button"
        >
          {orderInfo.fee_details_v1 &&
            orderInfo.fee_details_v1.map((value) => {
              return (
                <OrderSummaryItem
                  title={value.display_name}
                  key={uuid()}
                  value={orderInfo.hipcoin_details.to_strikeoff_charges ? <strike>{value.display_value}</strike> : value.display_value}
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

          {orderInfo.promo_details.promo_code.length > 0 &&
            <div className={classes.hipcoinSection}>
              <div className={classes.hipcoinIcon}>
                <img src={promoIcon} />
              </div>
              <div className={classes.hipcoinContent}>
                <p>{orderInfo.promo_details.promo_code}</p>
              </div>
            </div>
          }

          {orderInfo.hipcoin_details.redeemed_text.length > 0 &&
             <div className={classes.hipcoinSection}>
               <div className={classes.hipcoinIcon}>
                 <img src={hipcoinIcon} />
               </div>
               <div className={classes.hipcoinContent}>
                 <p>{orderInfo.hipcoin_details.redeemed_text}</p>
               </div>
             </div>
          }

        </OrderSummaryItem>
        <OrderSummaryItem title="Hipcoin Details" type="button">
          <OrderSummaryItem
            title="Hipcoins Redeemed"
            value={orderInfo.hipcoin_details.redeemed}
          />
          {orderInfo.hipcoin_details.earned != null && (
            <OrderSummaryItem title="To Be Generated" type="button">
              <Box width="100%" mx="auto">
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="center">Expiry At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderInfo.hipcoin_details.earned.map((value) => {
                        return (
                          <TableRow>
                            <TableCell align="center">{value.type}</TableCell>
                            <TableCell align="center">{value.value}</TableCell>
                            <TableCell align="center">
                              {value.expiry_at
                                ? Moment(value.expiry_at).format(
                                    "D MMM hh:mm A"
                                  )
                                : "-"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </OrderSummaryItem>
          )}
        </OrderSummaryItem>
        <Divider />
        <OrderSummaryItem title="Payment Details" value={""} type="button">
          <OrderSummaryItem
            title="Mode of Payment:"
            value={orderInfo.mode_of_payment ? orderInfo.mode_of_payment : "-"}
          />
          <OrderSummaryItem
            title="Amount received:"
            value={orderInfo.display_amount_received ? orderInfo.display_amount_received : "-"}
          />
          <OrderSummaryItem
            title="Wallet:"
            value={orderInfo.wallet_total ? orderInfo.wallet_total : "-"}
            type="button"
          >
            <OrderSummaryItem
              title="HipBar Wallet:"
              value={
                orderInfo.revised_hipbar_total
                  ? orderInfo.revised_hipbar_total
                  : "-"
              }
            />
            <OrderSummaryItem
              title="Gift Wallet:"
              value={
                orderInfo.revised_gift_total
                  ? orderInfo.revised_gift_total
                  : "-"
              }
            />
            <OrderSummaryItem
              title="Nodal amount:"
              value={
                orderInfo.revised_nodal_amount
                  ? orderInfo.revised_nodal_amount
                  : "-"
              }
            />
            {/* <OrderSummaryItem
              title="UPI amount: "
              value={orderInfo.upi_amount ? orderInfo.upi_amount : "-"}
            /> */}
            <OrderSummaryItem
              title="UPI: "
              value={orderInfo.upi_id ? orderInfo.upi_id : "-"}
            />
          </OrderSummaryItem>
          {orderInfo.pending_amount !== null &&
             <OrderSummaryItem
              title={orderInfo.pending_amount.display_title}
              value={orderInfo.pending_amount.display_value}
             >
             </OrderSummaryItem>
          }
        </OrderSummaryItem>
      </List>
      <Divider />
      <List>
        {props.cartSummary !== null &&
          // props.cartSummary.action !== "nothing" &&
          props.modify && (
            <>
              <OrderSummaryItem
                title="Difference in Order Amount"
                type="button"
              >
                {props.cartSummary.display_details.map((item, index) => {
                  return (
                    <OrderSummaryItem
                      key={index}
                      title={item.display_title}
                      value={item.display_value ? item.display_value : "-"}
                    />
                  );
                })}
              </OrderSummaryItem>
              <Divider />
              {props.modify && props.cartSummary.action !== "toRefund" && (
                <>
                  <ListItem
                    classes={{ root: classes.ListItemRoot }}
                    dense
                    disableGutters
                    button={true}
                    onClick={handleClick}
                    ref={ref}
                  >
                    <ListItemText
                      primary={"To Debit"}
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
                          {props.cartSummary !== null && (
                            <Checkbox
                              color={"primary"}
                              checked={props.checkedHBWallet}
                              onChange={handleChangeHipbarWallet}
                              value={props.checkedHBWallet}
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
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
                          props.cartSummary.hipbar_wallet
                            .display_charged_credits
                            ? props.cartSummary.hipbar_wallet
                                .display_charged_credits
                            : "-"
                        }
                        secondary={
                          props.cartSummary.hipbar_wallet
                            .display_available_credits
                            ? props.cartSummary.hipbar_wallet
                                .display_available_credits
                            : "-"
                        }
                        className={classes.ListItemTextRoot}
                        classes={{ root: classes.ListItemTextValue }}
                      />
                    </ListItem>
                    {props.modify && props.hbError && props.checkedHBWallet && (
                      <ListItem>
                        <Alert
                          variant="outlined"
                          severity="error"
                        >{`Only ${props.cartSummary.hipbar_wallet.display_available_limit} can be used from this wallet! Try changing amount.`}</Alert>
                      </ListItem>
                    )}
                    <ListItem
                      classes={{ root: classes.ListItemRoot }}
                      dense
                      disableGutters
                    >
                      {props.modify && (
                        <ListItemIcon>
                          {props.cartSummary !== null && (
                            <Checkbox
                              color={"primary"}
                              checked={props.checkedGiftWallet}
                              onChange={handleChangeGiftWallet}
                              value={props.checkedGiftWallet}
                              inputProps={{
                                "aria-label": "secondary checkbox",
                              }}
                            />
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
                          props.cartSummary.gift_wallet.display_charged_credits
                            ? props.cartSummary.gift_wallet
                                .display_charged_credits
                            : "-"
                        }
                        secondary={
                          props.cartSummary.gift_wallet
                            .display_available_credits
                            ? props.cartSummary.gift_wallet
                                .display_available_credits
                            : "-"
                        }
                        className={classes.ListItemTextRoot}
                        classes={{ root: classes.ListItemTextValue }}
                      />
                    </ListItem>
                    {props.modify && props.gwError && props.checkedGiftWallet && (
                      <ListItem>
                        <Alert
                          variant="outlined"
                          severity="error"
                        >{`Only ${props.cartSummary.gift_wallet.display_available_limit} can be used from this wallet! Try changing amount.`}</Alert>
                      </ListItem>
                    )}
                  </Collapse>
                </>
              )}
            </>
          )}
      </List>
      {props.modify &&
        props.cartSummary &&
        props.cartSummary.action === "toLoad" && (
          <>
            <Divider />
            <List>
              <OrderSummaryItem
                title="To Pay:"
                value={
                  props.cartSummary.to_pay ? props.cartSummary.to_pay : "-"
                }
              />
            </List>
          </>
        )}
    </Box>
  );
};

OrderSummary.propTypes = {
  orderInfo: PropTypes.object,
  fetchGenre: PropTypes.func,
  modify: PropTypes.bool,
  products: PropTypes.array,
  cartSummary: PropTypes.object,
  show: PropTypes.bool,
  checkedGiftWallet: PropTypes.bool,
  checkedHBWallet: PropTypes.bool,
};

export { OrderSummary };
