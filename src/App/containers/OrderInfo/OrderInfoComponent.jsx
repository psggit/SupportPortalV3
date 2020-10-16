import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsCard } from "./components/orderDetailsCard";
import { CustomerContainer } from "./CustomerDetails/CustomerContainer";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { OrderStatusContainer } from "./OrderStatus";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import DialogComponent from "../../components/dialog";
import Loading from "../../components/loading";
import ErrorMsg from "../../components/errorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.body1,
  },
  boxContainer: {
    fontFamily: theme.typography.body1,
  },
  containerBox: {
    width: "100%",
    margin: 0,
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
  marginTop: {
    marginTop: "25px",
  },
}));

const OrderInfoComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  let { orderId } = useParams();
  // console.log("useParams ", orderId);

  useEffect(() => {
    console.log(orderId);
    // props.fetchOrderInfo(orderId);
    if (orderId === null || orderId == "") {
      history.push("/dashboard");
    } else {
      props.fetchOrderInfo(orderId);
    }
  }, []);

  useEffect(() => {
    // console.log("order_status_button", props.order.order_status_button);
    if (props.fetchOrderInfoSuccess) {
      let payload = {
        order_id: orderId,
      };
      props.fetchCancelReason(payload);
      const reqBody = { order_id: orderId, limit: 3, offset: 0 };
      props.fetchActivityLogs(reqBody);
    }
  }, [props.fetchOrderInfoSuccess]);

  let loading = props.fetchOrderInfoProgress;
  const [issueType, setIssueType] = useState(null);
  const [issueDesc, setIssueDesc] = useState("");
  const [open, setOpen] = useState(false);

  // console.log("useEffect 2", props);

  const openDialog = (type) => {
    setIssueType(type);
    if (type == null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleCall = (to) => {
    //to
    //from
    const payload = {
      to: to,
      from: props.from,
    };
    props.connectCall(payload);
  };

  const updateNotes = () => {
    let payload = {
      order_id: orderId,
      type: issueType,
      notes: issueDesc,
    };
    props.createNotes(payload);
    setOpen(false);
    props.fetchOrderInfo(orderId);
    props.fetchCancelReason(payload);
  };

  const dialogActions = [
    <Button
      variant="outlined"
      color="primary"
      key="closeDialog"
      onClick={() => openDialog(null)}
    >
      Cancel
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="createIssue"
      onClick={() => updateNotes()}
    >
      Save
    </Button>,
  ];

  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <div className={classes.root}>
      <TopBar />
      {open && (
        <DialogComponent
          title="ADD NOTE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
          issueDesc={issueDesc}
          change={setIssueDesc}
          openDialog={openDialog}
        >
          <TextField
            id="outlined-textarea"
            placeholder="Add note here"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            value={issueDesc}
            fullWidth
            onChange={(event) => setIssueDesc(event.target.value)}
          />
        </DialogComponent>
      )}
      <Box className={classes.boxContainer}>
        <Grid container spacing={4} className={classes.containerBox}>
          <Grid item xs={3}>
            {props.fetchOrderInfoSuccess && <OrderStatusContainer />}
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={4} className={classes.marginTop}>
              <Grid item xs={6}>
                {props.fetchOrderInfoSuccess && <CartContainer {...props} />}
              </Grid>
              <Grid item xs={6}>
                {props.fetchOrderInfoSuccess && (
                  <>
                    <OrderDetailsCard
                      {...props}
                      buttonState={!props.order.order_status_button}
                    />
                  </>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <CustomerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <RetailerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <DeliveryAgentContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Box
              display="flex"
              alignItems="flex-end"
              flexDirection="column"
              border={1}
            >
              <Button color="primary">O</Button>
              <Button>C</Button>
              <Button>R</Button>
              <Button>D</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {props.connectCallSuccess && (
        <ErrorMsg show={true} message={props.successMsg} type="success" />
      )}
    </div>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchCancelReason: PropTypes.func,
  fetchActivityLogs: PropTypes.func,
  cancelReasons: PropTypes.object,
  fetchOrderInfoSuccess: PropTypes.bool,
  fetchCancelReasonSuccess: PropTypes.bool,
  fetchOrderInfoProgress: PropTypes.bool,
  fetchCancelReasonProgress: PropTypes.bool,
  orderId: PropTypes.any,
  order: PropTypes.object,
  createNotes: PropTypes.func,
  connectCall: PropTypes.func,
  from: PropTypes.number,
  connectCallSuccess: PropTypes.bool,
  successMsg: PropTypes.string,
};

export { OrderInfoComponent };
