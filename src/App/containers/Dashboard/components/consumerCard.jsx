import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
  },
  card: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  buttonDiv: {
    textAlign: "right",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  marginLeft: {
    marginLeft: "auto",
  },
  heading: {
    fontSize: "16px",
    lineHeight: "22px",
  },
}));

const ConsumerCard = (props) => {
  const classes = useStyles();
  const errorString = props.errorString;
  let defValueCustomerNo = "";
  let defValueOrderNo = "";
  let defValueCustomerId = "";

  if (!("consumer_contact_number" in props.payload.consumer)) {
    defValueCustomerNo = "";
  } else {
    defValueCustomerNo = props.payload.consumer["consumer_contact_number"];
  }

  if (!("order_id" in props.payload.consumer)) {
    defValueOrderNo = "";
  } else {
    defValueOrderNo = props.payload.consumer["order_id"];
  }

  if (!("customer_id" in props.payload.consumer)) {
    defValueCustomerId = "";
  } else {
    defValueCustomerId = props.payload.consumer["customer_id"];
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          CUSTOMER DETAILS
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          autoComplete="off"
          margin="normal"
          label="Mobile Number"
          helperText={
            errorString.status && errorString.filterType == "consumer"
              ? errorString.value
              : ""
          }
          defaultValue={defValueCustomerNo}
          value={defValueCustomerNo}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "Mobile Number",
              "consumer",
              "consumer_contact_number"
            )
          }
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Order ID"
          variant="outlined"
          size="small"
          label="Order ID"
          defaultValue={defValueOrderNo}
          value={defValueOrderNo}
          inputProps={{ maxLength: 16 }}
          onChange={(event) =>
            props.handleChange(event, "order-id", "consumer", "order_id")
          }
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Customer ID"
          variant="outlined"
          size="small"
          label="Customer ID"
          defaultValue={defValueCustomerId}
          value={defValueCustomerId}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(event, "customer-id", "consumer", "customer_id")
          }
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginLeft}
          size="small"
          onClick={() => props.reset("consumer")}
          disabled={props.filterType === "consumer" && props.isResetDisabled}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={
            errorString.filterType == "consumer" && props.isFetchDisabled
          }
          onClick={() => props.handleSubmit("consumer")}
        >
          Fetch Details
        </Button>
      </CardActions>
    </Card>
  );
};

ConsumerCard.propTypes = {
  errorString: PropTypes.object,
  handleChange: PropTypes.func,
  isResetDisabled: PropTypes.bool,
  isFetchDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  payload: PropTypes.object,
  filterType: PropTypes.string,
};

export { ConsumerCard };
