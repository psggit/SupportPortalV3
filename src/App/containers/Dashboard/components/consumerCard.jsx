import React from "react";
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
  actionContainer: {
    padding: theme.spacing(2),
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

  if (!("consumer_id" in props.payload.consumer)) {
    defValueCustomerId = "";
  } else {
    defValueCustomerId = props.payload.consumer["consumer_id"];
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          CUSTOMER ORDER SEARCH
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          autoComplete="off"
          margin="normal"
          size="small"
          label="Mobile Number"
          helperText={
            errorString.status && errorString.filterType == "consumer"
              ? errorString.value
              : ""
          }
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
          label="Order ID"
          size="small"
          value={defValueOrderNo}
          inputProps={{ maxLength: 16 }}
          onChange={(event) =>
            props.handleChange(event, "order-id", "consumer", "order_id")
          }
        />
        <TextField
          fullWidth
          margin="normal"
          size="small"
          placeholder="Customer ID"
          variant="outlined"
          label="Customer ID"
          value={defValueCustomerId}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(event, "consumer-id", "consumer", "consumer_id")
          }
        />
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginLeft}
          onClick={() => props.reset("consumer")}
          disabled={props.filterType === "consumer" && props.isResetDisabled}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            errorString.filterType == "consumer" && props.isFetchDisabled
          }
          onClick={() => props.handleSubmit("consumer")}
        >
          Fetch Orders
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
