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
import { Grid, Tab } from "@material-ui/core";
import Notification from "../../../components/notification";

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
    padding: "0px 50px",
  },
  navBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "24px",
    color: "#696969",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "21px",
  },
  navContent: {
    marginLeft: "22px",
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
    marginBottom: "16px",
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
    marginLeft: "500px",
    display: "flex",
    paddingBottom: "20px",
  },
}));

function CustomerForm(props) {
  const classes = useStyles();
  const [consumerDetail, setConsumerDetail] = useState("");
  // console.log("useffect", consumerDetail);
  const [customerName, setCustomerName] = useState("");
  const [dob, setDob] = useState("");
  const [value, setSelectedValue] = useState("not-specified");
  const [signupDate, setSignupDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setConsumerDetail(props.orderInfo);
    setCustomerName(props.orderInfo.customer_name);
    setDob(props.orderInfo.customer_dob.slice(0, 10));
    if (props.orderInfo.customer_gender.length !== 0) {
      setSelectedValue(props.orderInfo.customer_gender);
    }
    setSignupDate(props.orderInfo.customer_sign_up_date.slice(0, 10));
    //setSignupDate(Moment(props.orderInfo.customer_sign_up_date).format("DD/MM/YYYY"));
  }, []);

  useEffect(() => {
    setMessage(props.updateSuccess);
  }, [props.updateSuccess]);

  const handleClose = () => {
    setMessage(false);
  };

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
      consumer_id: parseInt(props.orderInfo.customer_id),
      dob: dob,
      gender: value,
      name: customerName,
    };
    props.updateConsumer(payload);
  };

  // let loading = props.soaProgress;
  // if (loading) {
  //   return <Loading message="Loading..." />;
  // }

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={0}
          orderId={props.orderInfo.order_id}
          customerId={props.orderInfo.customer_id}
        />
        <div className={classes.section1}>
          <p>CUSTOMER ID: {props.orderInfo.customer_id}</p>
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
                value={consumerDetail.hipbar_wallet}
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
                value={consumerDetail.gift_wallet}
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
        {message && (
          <Notification
            message={props.updateSuccessMsg}
            messageType="success"
            open={message}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}

CustomerForm.prototype = {
  orderInfo: PropTypes.object,
  updateConsumer: PropTypes.func,
};

export { CustomerForm };
