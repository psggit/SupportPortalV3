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
    justifyContent: "flex-end",
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

const PreponeDeliveryCard = (props) => {
  const classes = useStyles();
  const errorString = props.errorString;
  let defValueRetailerNo = "";

  // console.log("props", props);

  if (!("order_id" in props.payload.assignWarehouse)) {
    defValueRetailerNo = "";
  } else {
    defValueRetailerNo = props.payload.assignWarehouse["order_id"];
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          PREPONE ORDER DELIVERY
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          placeholder="Order ID"
          variant="outlined"
          size="small"
          label="Order ID"
          value={defValueRetailerNo}
          inputProps={{ maxLength: 16 }}
          onChange={(event) =>
            props.handleChange(event, "", "assignWarehouse", "order_id")
          }
        />
      </CardContent>
      <CardActions className={classes.actionContainer}>
        <Button
          variant="contained"
          color="primary"
          disabled={
            errorString.filterType === "assignWarehouse" &&
            props.isFetchDisabled
          }
          onClick={() => props.handleSubmit("assignWarehouse")}
        >
          Prepone Order
        </Button>
      </CardActions>
    </Card>
  );
};

PreponeDeliveryCard.propTypes = {
  errorString: PropTypes.object,
  handleChange: PropTypes.func,
  isResetDisabled: PropTypes.bool,
  isFetchDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  payload: PropTypes.object,
  filterType: PropTypes.string,
};

export { PreponeDeliveryCard };
