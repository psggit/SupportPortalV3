import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { OrderDetails } from "./components/orderDetails";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
    fontFamily: theme.typography.fontFamily,
  },
  RetailerCardComponent: {
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItemRoot: {
    width: "100%",
    fontSize: 16,
    color: "#606060",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
    textAlign: "right",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  buttonDiv: {
    textAlign: "right",
    justifyContent: "space-between",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionContainer: {
    padding: 0,
  },
  marginLeft: {
    marginLeft: "auto",
  },
  finalRow: {
    marginBottom: "23px",
  },
}));

const RetailerCardComponent = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.RetailerCardComponent} variant="outlined">
      <CardContent p={2}>
        <OrderDetails {...props} />
        <CardActions className={classes.actionContainer}>
          {/* <Button
            variant="outlined"
            color="primary"
            className={classes.marginLeft}
          >
            Call
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            className={classes.marginLeft}
            onClick={() =>
              props.handleSelect(
                props.value.retailer_name,
                props.value.retailer_id
              )
            }
          >
            Select
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

RetailerCardComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  handleSelect: PropTypes.func,
  orderInfos: PropTypes.object,
  totalDa: PropTypes.string,
  freeDa: PropTypes.string,
  reassignRetailer: PropTypes.func,
  value: PropTypes.object,
  reassignRetailerFailed: PropTypes.bool,
  errorMessage: PropTypes.any,
  reassignRetailerSuccess: PropTypes.bool,
  reassignRetailerProgress: PropTypes.bool,
  successMsg: PropTypes.any,
  resetOnUnmount: PropTypes.func,
  show: PropTypes.func,
};

export { RetailerCardComponent };
