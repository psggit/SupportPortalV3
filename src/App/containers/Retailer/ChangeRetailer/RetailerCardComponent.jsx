/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { OrderDetails } from "./components/orderDetails";
import Dialog from "../../../components/dialog";
import { Button } from "@material-ui/core";
import ErrorMsg from "../../../components/errorMsg";

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
  useEffect(() => {
    console.dir(props);
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  const classes = useStyles();
  const [mountDialog, setMountDialog] = useState(false);

  const handleSelect = () => {
    setMountDialog(true);
  };

  const handleCancel = () => {
    setMountDialog(false);
  };

  const handleConfirm = () => {
    const payload = {
      order_id: props.orderInfos.order_id,
      retailer_id: parseInt(props.value.retailer_id),
      retailer_name: props.value.retailer_name,
      warehouse_id: parseInt(props.orderInfos.warehouse_id),
      delivery_status: props.orderInfos.delivery_status,
      assigned_delivery_agent: parseInt(props.orderInfos.delivery_agent_id),
      reserved_for_da_id: parseInt(props.orderInfos.delivery_agent_id),
      cancellation_reason: "",
    };
    props.reassignRetailer(payload);
    // console.log("RetailerCardComponent", props.errorMessage.message);
    setMountDialog(false);
  };

  return (
    <Card className={classes.RetailerCardComponent} variant="outlined">
      <CardContent p={2}>
        <OrderDetails {...props} />
        <CardActions className={classes.actionContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.marginLeft}
          >
            Call
          </Button>
          <Button variant="contained" color="primary" onClick={handleSelect}>
            Select
          </Button>
        </CardActions>
        {mountDialog && (
          <Dialog
            title={"Change Retailer"}
            actions={[
              <Button
                variant="outlined"
                color="primary"
                className={classes.marginLeft}
                size="small"
                onClick={handleCancel}
              >
                Cancel
              </Button>,
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleConfirm}
              >
                Confirm
              </Button>,
            ]}
          >
            {
              "Delivery Agent not mapped to retailer. Do you still want to change retailer?"
            }
          </Dialog>
        )}
        {props.reassignRetailerFailed && (
          <ErrorMsg
            show={true}
            message={
              props.errorMessage !== ""
                ? props.errorMessage
                : "Something went wrong"
            }
            type={"error"}
          />
        )}
        {props.reassignRetailerSuccess && (
          <ErrorMsg
            show={true}
            message={props.successMsg.message}
            type={"success"}
          />
        )}
      </CardContent>
    </Card>
  );
};

RetailerCardComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  orderInfos: PropTypes.object,
  totalDa: PropTypes.string,
  freeDa: PropTypes.string,
  reassignRetailer: PropTypes.func,
  value: PropTypes.object,
  reassignRetailerFailed: PropTypes.bool,
  errorMessage: PropTypes.any,
  reassignRetailerSuccess: PropTypes.bool,
  successMsg: PropTypes.any,
  resetOnUnmount: PropTypes.func,
};

export { RetailerCardComponent };
