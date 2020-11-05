/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import PropTypes from "prop-types";
import TopBar from "../../../components/topBar";
import { FormControlLabel, RadioGroup } from "@material-ui/core";
import FullWidthTabs from "../customerMenuBar";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ErrorMsg from "../../../components/errorMsg";

const BlueRadio = withStyles({
  root: {
    color: "#0086AD",
    "&$checked": {
      color: "#0086AD",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  formContainer: {},
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  radioGrp: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  section2: {
    width: "100%",
    margin: 0,
    padding: "0px 50px 60px",
  },
  section1: {
    padding: "34px 24px",
    letterSpacing: "0.012em",
    fontSize: "16px",
    color: "#696969",
    fontWeight: "bold",
  },
  label: {
    alignSelf: "center",
  },
  textField: {
    backgroundColor: "#fff",
    width: "220px",
  },
  radioGroup: {
    display: "flex",
  },
  button: {
    marginLeft: "16px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "60%",
    justifyContent: "flex-end",
  },
  generalForm: {
    marginBottom: "16px",
  },
}));

function CustomerForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const [consumerDetail, setConsumerDetail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dob, setDob] = useState("");
  const [value, setSelectedValue] = useState("not-specified");
  const [signupDate, setSignupDate] = useState("");
  const customerId = history.location.state.customerId;
  const orderId = history.location.state.orderId;
  const orderInfos = history.location.state.orderInfos;
  const customerNumber = history.location.state.customerNumber;

  useEffect(() => {
    setConsumerDetail(orderInfos);
    setCustomerName(orderInfos.customer_name);
    setDob(orderInfos.customer_dob.slice(0, 10));
    if (orderInfos.customer_gender.length !== 0) {
      setSelectedValue(orderInfos.customer_gender);
    }
    setSignupDate(orderInfos.customer_sign_up_date.slice(0, 10));
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleReset = () => {
    setCustomerName("");
    setDob("");
    setSelectedValue("");
  };

  const handleSave = () => {
    const payload = {
      consumer_id: parseInt(customerId),
      dob: dob,
      gender: value,
      name: customerName,
    };
    props.updateConsumer(payload);
  };

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={0}
          orderId={orderId}
          customerId={customerId}
          customerNumber={customerNumber}
          orderInfos={orderInfos}
        />
        <div className={classes.section1}>
          <p>CUSTOMER ID: {customerId}</p>
        </div>
        <Grid container className={classes.section2}>
          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Customer Name</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Gender</p>
            </Grid>
            <RadioGroup
              name="gender1"
              value={value}
              onChange={handleChange}
              className={classes.radioGrp}
            >
              <FormControlLabel
                value="female"
                control={<BlueRadio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<BlueRadio />}
                label="Male"
              />
              <FormControlLabel
                value="not-specified"
                control={<BlueRadio />}
                label="Not Specified"
              />
            </RadioGroup>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Mobile Number</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={consumerDetail.customer_contact_number}
                disabled
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Email</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={consumerDetail.customer_email}
                size="small"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Date of Birth</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                type="date"
                name="dob"
                value={dob}
                size="small"
                fullWidth
                onChange={(e) => setDob(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Signup Date</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                type="date"
                variant="outlined"
                value={signupDate}
                size="small"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>KYC Level</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={consumerDetail.customer_kyc}
                size="small"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>HipBar Wallet Balance</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={consumerDetail.total_hipbar_wallet_balance}
                size="small"
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className={classes.generalForm}>
            <Grid item xs={3} className={classes.label}>
              <p>Gift Wallet Balance</p>
            </Grid>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                variant="outlined"
                value={consumerDetail.total_gift_wallet_balance}
                size="small"
                disabled
              />
            </Grid>
          </Grid>

          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              onClick={handleReset}
              variant="outlined"
              color="primary"
            >
              Reset
            </Button>
            <Button
              className={classes.button}
              onClick={() => handleSave()}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Grid>
        {props.updateSuccess && (
          <ErrorMsg
            show={true}
            message={props.updateSuccessMsg}
            type={"success"}
          />
        )}
        {props.updateFail && (
          <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
        )}
      </div>
    </>
  );
}

CustomerForm.prototype = {
  orderInfo: PropTypes.object,
  updateConsumer: PropTypes.func,
  resetOnUnmount: PropTypes.func,
};

export { CustomerForm };
