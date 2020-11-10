import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Input,
  TextField,
} from "@material-ui/core";
import OrderCard from "../../../components/card";
import { OrderSummaryItem } from "../../Cart/components/orderSummaryItem";
import { fetchDeliverOrderSuccess, fetchKycListSuccess } from "./duck/actions";
import ErrorMsg from "../../../components/errorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  marginLeft: {
    marginLeft: "auto",
  },
  ListItemRoot: {
    width: "100%",
    alignItems: "flex-start",
  },
  ListItemRootTitle: {
    width: "30%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
    width: "70%",
    fontSize: 16,
  },
  InputTextRoot: {
    maxWidth: 50,
    margin: 2,
    "& .MuiInput-input": {
      textAlign: "center",
    },
  },
  ListItemRow: {
    borderBottom: "1px solid #E5E5E5",
  },
  card: {
    boxShadow: "none",
  },
  formControl: {
    margin: theme.spacing(1),
    width: 188,
  },
  textField: {
    width: 188,
  },
}));

const OrderDetailsCard = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const payload = {
      city_id: props.order.city_id.toString(),
    };
    props.deliverOrderReasons(payload);
    props.fetchKycList();
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  let { platform, customer_address, delivery_status } = {
    ...props.order,
  };
  platform = platform === "hb" ? "Hipbar Web" : "Flipkart";

  const [openCancel, setOpenCancel] = useState(false);
  const [openDeliver, setOpenDeliver] = useState(false);
  const [selectedValue, setValue] = useState("");
  const [cancellationSummary, setCancellationSummary] = useState(false);
  const [completeBtnDisabled, setCompleteBtnDisabled] = useState(true);
  // const [kycArray, setKycArray] = useState(["", "", "", ""]);
  // const [dobArray, setDobArray] = useState(["", "", "", ""]);
  const [dob, setDob] = useState("");
  const [kyc, setKyc] = useState("");
  const [reasonIdx, setReasonIdx] = useState("");
  const [notes, setNotes] = useState("");
  const [kycDigits, setKycDigits] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = (type) => {
    if (type == "cancel") {
      if (props.fetchCancelReasonFailure) {
        props.handleError();
      } else {
        setOpenCancel(true);
      }
    } else {
      setOpenDeliver(true);
    }
  };

  const handleClose = () => {
    unmountConfirmationDialog();
    // setOpenCancel(false);
    // setOpenDeliver(false);
  };

  const handleCancel = () => {
    unmountConfirmationDialog();
  };

  const unmountConfirmationDialog = () => {
    setValue("");
    setCancellationSummary(false);
    setOpenCancel(false);
    setOpenDeliver(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setCancellationSummary(true);
    const payload = {
      order_id: props.order.order_id,
      restocking_charges: parseInt(props.order.restocking_charges),
      total_fee: parseInt(props.order.total_fee),
      cancellation_id: parseInt(selectedValue),
      retailer_id: parseInt(props.order.retailer_id),
      consumer_id: parseInt(props.order.customer_id),
      hipbar_wallet_amount:
        props.order.hipbar_wallet === ""
          ? 0
          : parseFloat(props.order.hipbar_wallet.split(" ")[1]),
      gift_wallet_amount:
        props.order.gift_wallet === ""
          ? 0
          : parseFloat(props.order.gift_wallet.split(" ")[1]),
    };
    props.cancelOrderSummary(payload);
  };

  const handleKycChange = (event) => {
    setKyc(event.target.value);
  };

  const handleReasonChange = (event) => {
    setReasonIdx(event.target.value);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };

  const handleDob = (event) => {
    setDob(event.target.value);
    setCompleteBtnDisabled(false);
  };

  const handleKyc = (event) => {
    setKycDigits(event.target.value);
  };

  const handleDeliver = () => {
    const payload = {
      order_id: props.order.order_id,
      id_proof: kyc,
      slot_id: "",
      // digits: kycArray.toString().split(",").join(""),
      // year_of_birth: dobArray.toString().split(",").join(""),
      digits: kycDigits,
      year_of_birth: dob,
      reason_for_completion: parseInt(reasonIdx),
      note_type: "order",
      note: notes,
    };
    props.deliverOrder(payload);
    setDisabled(true);
    setOpenDeliver(false);
  };

  const handleCancelOrder = () => {
    const payload = {
      reason_id: parseInt(selectedValue),
      order_id: props.order.order_id,
      slot_id: "",
      notes: notes,
    };
    props.cancelOrder(payload);
    setDisabled(true);
    setOpenCancel(false);
  };

  // const handleCompleteChange = (event, type, index) => {
  //   if (!isNaN(event.target.value)) {
  //     if (type == "kyc") {
  //       let newArray = [...kycArray];
  //       newArray[index] = event.target.value;
  //       setKycArray(newArray);
  //     }
  //     if (type == "dob") {
  //       let newArray = [...dobArray];
  //       newArray[index] = event.target.value;
  //       setDobArray(newArray);
  //     }
  //   }
  //   setCompleteBtnDisabled(false);
  // };

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      className={classes.marginLeft}
      onClick={() => handleClickOpen("cancel")}
      key="cancelBtn"
      // disabled={props.buttonState || disabled}
      disabled={!props.orderInfo.cancel_order_button}
    >
      Cancel Order
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="deliverBtn"
      onClick={() => handleClickOpen("deliver")}
      //disabled={props.buttonState || disabled}
      disabled={!props.orderInfo.order_status_button}
    >
      Deliver Order
    </Button>,
  ];

  return (
    <>
      <OrderCard title="Order Details" actions={actionButtons}>
        <List dense disablePadding>
          <ListItem dense disableGutters={true}>
            <ListItemText
              primary="Platform"
              className={classes.ListItemRootTitle}
              classes={{ root: classes.ListItemRootTitle }}
            />
            <ListItemText
              primary={platform}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
          <ListItem
            dense
            disableGutters={true}
            className={classes.ListItemRoot}
          >
            <ListItemText
              primary="Delivery Address"
              className={classes.ListItemRootTitle}
              classes={{ root: classes.ListItemRootTitle }}
            />
            <ListItemText
              primary={customer_address}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
          <ListItem
            dense
            disableGutters={true}
            className={classes.ListItemRoot}
          >
            <ListItemText
              primary="Order Status"
              className={classes.ListItemRootTitle}
              classes={{ root: classes.ListItemRootTitle }}
            />
            <ListItemText
              primary={delivery_status}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
        </List>
      </OrderCard>
      {props.cancelOrderFailure && (
        <ErrorMsg
          show={true}
          message={
            props.errorMsg !== "" ? props.errorMsg : "Something went wrong"
          }
          type={"error"}
        />
      )}

      {props.cancelOrderSuccess && (
        <ErrorMsg
          show={true}
          message={props.successMsg.message}
          type={"success"}
        />
      )}
      {props.deliverOrderFailed && (
        <ErrorMsg
          show={true}
          message={
            props.errorMsg !== "" ? props.errorMsg : "Something went wrong"
          }
          type={"error"}
        />
      )}
      {props.deliverOrderSuccess && (
        <ErrorMsg
          show={true}
          message={props.successMsg.message}
          type={"success"}
        />
      )}
      <Dialog
        open={openCancel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you want to cancel order? Select reason for cancelling order and click Confirm to proceed.`}
        </DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Reason</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) => handleChange(event)}
            >
              {props.fetchCancelReasonSuccess &&
                props.cancelReasons.map((value, index) => {
                  if (selectedValue === value) {
                    return (
                      <MenuItem value={value.id} key={index} selected={true}>
                        {value.reason}
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem value={value.id} key={index}>
                        {value.reason}
                      </MenuItem>
                    );
                  }
                })}
            </Select>
          </FormControl>
          {props.fetchCancellationSummarySuccess && cancellationSummary && (
            <div>
              <OrderSummaryItem title="Cancellation charges" />
              <OrderSummaryItem
                title="Total Cancellation Charges:"
                value={props.cancelOrderSummaryData.total_cancellation_charges}
                type="button"
              >
                <OrderSummaryItem title="Refund Amount" />
                <OrderSummaryItem
                  title="Wallet:"
                  value={props.cancelOrderSummaryData.refund_amount.wallet}
                />
                <OrderSummaryItem
                  title="HipBar Wallet:"
                  value={
                    props.cancelOrderSummaryData.refund_amount.hipbar_wallet
                  }
                />
                <OrderSummaryItem
                  title="Gift Wallet:"
                  value={props.cancelOrderSummaryData.refund_amount.gift_wallet}
                />
              </OrderSummaryItem>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelOrder}
            color="primary"
            variant="outlined"
          >
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeliver}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "Do you want to complete order? Fill in required KYC details to proceed."
          }
        </DialogTitle>
        <DialogContent>
          <List dense disablePadding>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Customer ID"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />

              <FormControl className={classes.formControl}>
                <Select
                  id="demo-simple-select"
                  onChange={(event) => handleKycChange(event)}
                >
                  {fetchKycListSuccess &&
                    props.kycListData !== null &&
                    props.kycListData.map((value, index) => {
                      return (
                        <MenuItem value={value.description} key={index}>
                          {value.description}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Last 4 Digits of customer ID"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />
              <TextField
                id="standard-basic"
                className={classes.textField}
                onChange={(event) => handleKyc(event)}
              />

              {/* {kycArray.map((value, index) => {
                return (
                  <Input
                    key={index}
                    value={value}
                    className={classes.InputTextRoot}
                    inputProps={{ maxLength: 1 }}
                    onChange={(event) =>
                      handleCompleteChange(event, "kyc", index)
                    }
                  />
                );
              })} */}
            </ListItem>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Year of birth"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />
              <TextField
                id="standard-basic"
                className={classes.textField}
                onChange={(event) => handleDob(event)}
              />
              {/* {dobArray.map((value, index) => {
                return (
                  <Input
                    key={index}
                    value={value}
                    inputProps={{ maxLength: 1 }}
                    className={classes.InputTextRoot}
                    onChange={(event) =>
                      handleCompleteChange(event, "dob", index)
                    }
                  />
                );
              })} */}
            </ListItem>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Reason for completion"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />
              <FormControl className={classes.formControl}>
                <Select
                  id="demo-simple-select"
                  onChange={(event) => handleReasonChange(event)}
                >
                  {fetchDeliverOrderSuccess &&
                    props.deliverOrderData !== null &&
                    props.deliverOrderData.map((value, index) => {
                      return (
                        <MenuItem value={value.id} key={index}>
                          {value.reason}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <TextField
            className={classes.formControlTextarea}
            rows={7}
            fullWidth
            variant="outlined"
            autoComplete="off"
            margin="normal"
            size="small"
            placeholder="Add note here"
            onChange={(event) => handleNotes(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleDeliver}
            color="primary"
            variant="contained"
            disabled={completeBtnDisabled}
          >
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

OrderDetailsCard.propTypes = {
  order: PropTypes.object,
  platform: PropTypes.string,
  address: PropTypes.string,
  handleCancel: PropTypes.func,
  handleDeliver: PropTypes.func,
  cancelReasons: PropTypes.any,
  deliverOrderData: PropTypes.array,
  kycListData: PropTypes.array,
  buttonState: PropTypes.bool,
  fetchCancelReasonSuccess: PropTypes.bool,
  fetchCancelReasonFailure: PropTypes.bool,
  fetchKycListSuccess: PropTypes.bool,
  fetchKycListProgress: PropTypes.bool,
  fetchDeliverOrderSuccess: PropTypes.bool,
  handleError: PropTypes.func,
  cancelOrderSummary: PropTypes.func,
  deliverOrderReasons: PropTypes.func,
  fetchKycList: PropTypes.func,
  deliverOrder: PropTypes.func,
  cancelOrderSummaryData: PropTypes.object,
  cancelOrderSuccess: PropTypes.bool,
  fetchCancellationSummarySuccess: PropTypes.bool,
  fetchCancellationSummaryFailed: PropTypes.bool,
  fetchCancellationSummaryProgress: PropTypes.bool,
  cancelOrder: PropTypes.func,
  cancelOrderFailure: PropTypes.bool,
  errorMsg: PropTypes.any,
  deliverOrderFailed: PropTypes.bool,
  successMsg: PropTypes.any,
  deliverOrderSuccess: PropTypes.bool,
  resetOnUnmount: PropTypes.func,
};

export { OrderDetailsCard };
