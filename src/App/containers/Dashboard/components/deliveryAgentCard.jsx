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

const DeliveryAgentCard = (props) => {
  const classes = useStyles();
  const errorString = props.errorString;
  let defValueDeliveryAgentNo = "";
  let defValueDeliveryAgentId = "";

  if (
    !("delivery_agent_contact_number" in props.payload.delivery_agent_details)
  ) {
    defValueDeliveryAgentNo = "";
  } else {
    defValueDeliveryAgentNo =
      props.payload.delivery_agent_details["delivery_agent_contact_number"];
  }

  if (!("delivery_agent_id" in props.payload.delivery_agent_details)) {
    defValueDeliveryAgentId = "";
  } else {
    defValueDeliveryAgentId =
      props.payload.delivery_agent_details["delivery_agent_id"];
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          DELIVERY AGENT DETAILS
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          autoComplete="off"
          margin="normal"
          size="small"
          label="Mobile Number"
          helperText={
            errorString.status &&
            errorString.filterType == "delivery_agent_details"
              ? errorString.value
              : ""
          }
          value={defValueDeliveryAgentNo}
          inputProps={{ maxLength: 10 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "Mobile Number",
              "delivery_agent_details",
              "delivery_agent_contact_number"
            )
          }
        />
        <TextField
          fullWidth
          margin="normal"
          placeholder="Agent ID"
          variant="outlined"
          size="small"
          label="Agent ID"
          value={defValueDeliveryAgentId}
          inputProps={{ maxLength: 16 }}
          onChange={(event) =>
            props.handleChange(
              event,
              "retailer-code",
              "delivery_agent_details",
              "delivery_agent_id"
            )
          }
        />
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginLeft}
          onClick={() => props.reset("delivery_agent_details")}
          disabled={
            props.filterType === "delivery_agent_details" &&
            props.isResetDisabled
          }
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={
            errorString.filterType == "delivery_agent_details" &&
            props.isFetchDisabled
          }
          onClick={() => props.handleSubmit("delivery_agent_details")}
        >
          Fetch Details
        </Button>
      </CardActions>
    </Card>
  );
};

DeliveryAgentCard.propTypes = {
  errorString: PropTypes.object,
  handleChange: PropTypes.func,
  isResetDisabled: PropTypes.bool,
  isFetchDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  payload: PropTypes.object,
  filterType: PropTypes.string,
};

export { DeliveryAgentCard };
