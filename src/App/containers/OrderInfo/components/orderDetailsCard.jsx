import React, { useState } from "react";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Input,
  TextField,
} from "@material-ui/core";

import OrderCard from "../../../components/card";
import { OrderSummaryItem } from "../../Cart/components/orderSummaryItem";
import {
  kycDetailsMockData,
  deliveryOrderReasons,
} from "../../../mockDataResponse";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  actionContainer: {
    padding: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: "auto",
  },
  heading: {
    fontSize: "16px",
    lineHeight: "22px",
  },
  ListItems: {
    color: "#010B13",
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
    minWidth: 200,
  },
}));

const OrderDetailsCard = (props) => {
  const classes = useStyles();

  //TODOS:@Purva - clean up mock data
  // fetchKYCDetailsSuccess - should be returned from KYC details
  const fetchKYCDetailsSuccess = true;

  let { platform, customer_address } = {
    ...props.order,
  };
  platform = platform === "hb" ? "Hipbar Web" : "Flipkart";

  const [openCancel, setOpenCancel] = useState(false);
  const [openDeliver, setOpenDeliver] = useState(false);
  const [value, setValue] = useState("female");
  const [completeBtnDisabled, setCompleteBtnDisabled] = useState(true);
  const [kycArray, setKycArray] = useState(["", "", "", ""]);
  const [dobArray, setDobArray] = useState(["", "", "", ""]);

  const handleClickOpen = (type) => {
    if (type == "cancel") {
      setOpenCancel(true);
    } else {
      setOpenDeliver(true);
    }
  };

  const handleClose = () => {
    setOpenCancel(false);
    setOpenDeliver(false);
  };

  const handleCancel = () => {
    //call function in props
    setOpenCancel(false);
    setOpenDeliver(false);
  };

  // const handleDeliver = () => {};
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCompleteChange = (event, type, index) => {
    if (!isNaN(event.target.value)) {
      if (type == "kyc") {
        let newArray = [...kycArray];
        newArray[index] = event.target.value;
        setKycArray(newArray);
      }
      if (type == "dob") {
        let newArray = [...dobArray];
        newArray[index] = event.target.value;
        setDobArray(newArray);
      }
    }

    console.log(kycArray);
    // let validate = false;
    // let validateValue = kycArray.filter((element) => element === "");
    // console.log(validate, validateValue, validateValue.length);
    setCompleteBtnDisabled(false);
  };

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      className={classes.marginLeft}
      onClick={() => handleClickOpen("cancel")}
      key="cancelBtn"
      disabled={props.buttonState}
    >
      Cancel Order
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="deliverBtn"
      onClick={() => handleClickOpen("deliver")}
      disabled={props.buttonState}
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
        </List>
      </OrderCard>
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
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            {props.fetchCancelReasonSuccess &&
              props.cancelReasons.map((value) => {
                return (
                  <FormControlLabel
                    key={value.id}
                    value={value.id}
                    control={<Radio />}
                    label={value.reason}
                  />
                );
              })}
          </RadioGroup>
          <OrderSummaryItem title="Cancellation charges" value={""} />
          <OrderSummaryItem
            title="Total Cancellation Charges:"
            value={"₹ 2000"}
            type="button"
          >
            <OrderSummaryItem title="Taxes" value="Taxes charges" />
          </OrderSummaryItem>
          <OrderSummaryItem title="Refund Amount" value={""} />
          <OrderSummaryItem title="Wallet:" value={"₹ 2000"} />
          <OrderSummaryItem title="HipBar Wallet:" value={"₹ 2000"} />
          <OrderSummaryItem title="Gift Wallet:" value={"₹ 3000"} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
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
                <Select id="demo-simple-select">
                  {fetchKYCDetailsSuccess &&
                    kycDetailsMockData.map((value, index) => {
                      return (
                        <MenuItem value={value.id} key={index}>
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

              {kycArray.map((value, index) => {
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
              })}
            </ListItem>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Year of birth"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />
              {dobArray.map((value, index) => {
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
              })}
            </ListItem>
            <ListItem dense disableGutters={true}>
              <ListItemText
                primary="Reason for completion"
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextRoot }}
              />
              <FormControl className={classes.formControl}>
                <Select id="demo-simple-select">
                  {fetchKYCDetailsSuccess &&
                    deliveryOrderReasons.map((value, index) => {
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
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
  cancelReasons: PropTypes.array,
  buttonState: PropTypes.bool,
  fetchCancelReasonSuccess: PropTypes.bool,
  fetchKYCDetailsSuccess: PropTypes.bool,
};

export { OrderDetailsCard };
