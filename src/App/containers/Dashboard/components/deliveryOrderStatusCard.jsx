import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl, InputLabel, Select } from "@material-ui/core/";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  actionContainer: {
    padding: theme.spacing(2),
    justifyContent: "flex-end",
  },
  card: {
    minHeight: 120,
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const DeliveryOrderStatusCard = (props) => {
  const classes = useStyles();
  let defValueRetailerNo = "restocked";
  // const disabled = true;
  // const [age, setAge] = useState(defValueRetailerNo);

  if (!("deliver_status" in props.payload.deliver_status)) {
    defValueRetailerNo = "";
  } else {
    defValueRetailerNo = props.payload.deliver_status["deliver_status"];
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          DELIVER ORDER SEARCH
        </Typography>
        {props.fetchDeliverySuccess && (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Order Status</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(event) =>
                props.handleChange(
                  event,
                  "delivery_status",
                  "delivery_status",
                  "delivery_status"
                )
              }
            >
              {props.data.map((value, index) => {
                if (defValueRetailerNo == value.Status) {
                  return (
                    <MenuItem value={value.Status} key={index} selected={true}>
                      {value.Status}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem value={value.Status} key={index}>
                      {value.Status}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
        )}
        {props.fetchDeliveryProgress && (
          <Alert severity="info">{"Fetching delivery status..."}</Alert>
        )}
        {props.fetchDeliveryFailed && (
          <Alert severity="error">{props.errorMessageDeliveryStatus}</Alert>
        )}
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={props.fetchDeliveryProgress || props.fetchDeliveryFailed}
          onClick={() => props.handleSubmit("delivery_status")}
        >
          Fetch Orders
        </Button>
      </CardActions>
    </Card>
  );
};

DeliveryOrderStatusCard.propTypes = {
  errorString: PropTypes.object,
  handleChange: PropTypes.func,
  isResetDisabled: PropTypes.bool,
  isFetchDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  payload: PropTypes.object,
  filterType: PropTypes.string,
  data: PropTypes.array,
  fetchDeliveryFailed: PropTypes.bool,
  fetchDeliverySuccess: PropTypes.bool,
  fetchDeliveryProgress: PropTypes.bool,
  errorMessageDeliveryStatus: PropTypes.string,
};

export { DeliveryOrderStatusCard };
