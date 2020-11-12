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

const RetailerCard = (props) => {
  const classes = useStyles();
  const errorString = props.errorString;
  let defValueCustomerNo = "";
  let defValueRetailerNo = "";
  let defValueRetailerCode = "";

  if (!("retailer_contact_number" in props.payload.retailer_details)) {
    defValueCustomerNo = "";
  } else {
    defValueCustomerNo =
      props.payload.retailer_details["retailer_contact_number"];
  }

  if (!("retailer_id" in props.payload.retailer_details)) {
    defValueRetailerNo = "";
  } else {
    defValueRetailerNo = props.payload.retailer_details["retailer_id"];
  }

  if (!("retailer_code" in props.payload.retailer_details)) {
    defValueRetailerCode = "";
  } else {
    defValueRetailerCode = props.payload.retailer_details["retailer_code"];
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          RETAILER ORDER SEARCH
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          autoComplete="off"
          margin="normal"
          label="Mobile Number"
          size="small"
          helperText={
            errorString.status && errorString.filterType == "retailer_details"
              ? errorString.value
              : ""
          }
          value={defValueCustomerNo}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "Mobile Number",
              "retailer_details",
              "retailer_contact_number"
            )
          }
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Retailer ID"
          variant="outlined"
          size="small"
          label="Retailer ID"
          value={defValueRetailerNo}
          inputProps={{ maxLength: 16 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "retailer-id",
              "retailer_details",
              "retailer_id"
            )
          }
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Store Code"
          variant="outlined"
          size="small"
          label="Store Code"
          value={defValueRetailerCode}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "retailer-code",
              "retailer_details",
              "retailer_code"
            )
          }
        />
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginLeft}
          onClick={() => props.reset("retailer_details")}
          disabled={
            props.filterType === "retailer_details" && props.isResetDisabled
          }
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            errorString.filterType === "retailer_details" &&
            props.isFetchDisabled
          }
          onClick={() => props.handleSubmit("retailer_details")}
        >
          Fetch Orders
        </Button>
      </CardActions>
    </Card>
  );
};

RetailerCard.propTypes = {
  errorString: PropTypes.object,
  handleChange: PropTypes.func,
  isResetDisabled: PropTypes.bool,
  isFetchDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  payload: PropTypes.object,
  filterType: PropTypes.string,
};

export { RetailerCard };
