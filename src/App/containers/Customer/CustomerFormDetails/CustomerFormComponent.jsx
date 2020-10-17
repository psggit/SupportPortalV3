/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

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
      width: "25ch",
    },
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
  section2: {
    width: "40%",
    paddingLeft: "50px",
  },
  generalForm: {
    display: "flex",
    justifyContent: "space-between",
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
  const history = useHistory();
  const classes = useStyles();
  const [consumerDetail, setConsumerDetail] = useState("");
  console.log("useffect", consumerDetail);
  const [customerName, setCustomerName] = useState("");
  const [dob, setDob] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [signupDate, setSignupDate] = useState("");

  useEffect(() => {
    setConsumerDetail(props.orderInfo);
    setCustomerName(props.orderInfo.customer_name);
    setDob(props.orderInfo.customer_dob.slice(0, 10));
    setSelectedValue(props.orderInfo.customer_gender);
    setSignupDate(props.orderInfo.customer_sign_up_date.slice(0, 10));
    //setSignupDate(Moment(props.orderInfo.customer_sign_up_date).format("DD/MM/YYYY"));
  }, []);

  const handleRadioChange = (event) => {
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
      gender: selectedValue,
      name: customerName,
    };
    props.updateConsumer(payload);
  };

  const handleGiftSoaChange = () => {
    console.log("gift-soa");
    history.push("/gift-soa");
  };

  const handleRewardChange = () => {
    history.push("/rewards");
  };

  const handleSoaChange = () => {
    history.push("/soa");
  };

  const handleNotesChange = () => {
    history.push("/notes");
  };

  const handleBack = () => {
    history.push("/order-info");
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div onClick={handleBack}>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleSoaChange}>SOA</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleGiftSoaChange}>Gift Soa</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleRewardChange}>Rewards</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleNotesChange}>Notes</div>
        </div>
      </div>
      <div className={classes.section1}>
        <p>CUSTOMER ID: {props.orderInfo.customer_id}</p>
      </div>
      <div className={classes.section2}>
        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Customer Name</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              size="small"
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Gender</p>
          </div>
          <div className={classes.radioGroup}>
            <div>
              <label>Female</label>
              <BlueRadio
                checked={selectedValue === "female"}
                onChange={handleRadioChange}
                value="female"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Female" }}
              />
            </div>
            <div>
              <label>Male</label>
              <BlueRadio
                checked={selectedValue === "male"}
                onChange={handleRadioChange}
                value="male"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Male" }}
              />
            </div>
            <div>
              <label>Not Specified</label>
              <BlueRadio
                checked={selectedValue === "notSpecified"}
                onChange={handleRadioChange}
                value="notSpecified"
                name="radio-button-demo"
                inputProps={{ "aria-label": "Not Spacified" }}
              />
            </div>
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Mobile Number</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              value={consumerDetail.customer_contact_number}
              disabled
              size="small"
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Email</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              value={consumerDetail.customer_email}
              size="small"
              disabled
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Date of Birth</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              type="date"
              name="dob"
              value={dob}
              size="small"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Signup Date</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              type="date"
              variant="outlined"
              value={signupDate}
              size="small"
              disabled
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>KYC Level</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              value={consumerDetail.customer_kyc}
              size="small"
              disabled
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>HipBar Wallet Balance</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              value={consumerDetail.hipbar_wallet}
              size="small"
              disabled
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Gift Wallet Balance</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              value={consumerDetail.gift_wallet}
              size="small"
              disabled
            />
          </div>
        </div>

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
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

CustomerForm.prototype = {
  orderInfo: PropTypes.object,
  updateConsumer: PropTypes.func,
};

export { CustomerForm };
