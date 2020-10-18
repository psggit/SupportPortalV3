import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsCard } from "./OrderCard/orderDetailsCard";
import { CustomerContainer } from "./CustomerDetails/CustomerContainer";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { OrderStatusContainer } from "./OrderStatus";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import DialogComponent from "../../components/dialog";
import Loading from "../../components/loading";
import ErrorMsg from "../../components/errorMsg";
import { ActivityLogContainer } from "./ActivityLogs";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

  useEffect(() => {
    if (orderId === null || orderId == "") {
      history.push("/dashboard");
    } else {
      props.fetchOrderInfo(orderId);
    }
  }, []);

  useEffect(() => {
    if (props.fetchOrderInfoSuccess) {
      let payload = {
        order_id: orderId,
      };
      props.fetchCancelReason(payload);
    }
  }, [props.fetchOrderInfoSuccess]);

  let loading = props.fetchOrderInfoProgress;
  const [issueType, setIssueType] = useState(null);
  const [newIssueDesc, setNewIssueDesc] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [showError, setShowError] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleAddIssue = () => {
    setOpenIssueDialog(!openIssueDialog);
  };

  const handleError = () => {
    // alert("");
    setShowError(!showError);
  };

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

  if (props.fetchOrderInfoFailure) {
    return <ErrorMsg show={true} message={props.errorMsg} type={"error"} />;
  }

  return (
    <div className={classes.root}>
      <TopBar />
      {open && (
        <DialogComponent
          title="ADD NOTE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
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
      {openIssueDialog && (
        <DialogComponent
          title="ADD NEW ISSUE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
          openDialog={handleAddIssue}
        >
          <TextField
            id="outlined-textarea"
            placeholder="Add issue description"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            value={newIssueDesc}
            fullWidth
            onChange={(event) => setNewIssueDesc(event.target.value)}
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
              <Grid item xs={6} id="section1">
                {props.fetchOrderInfoSuccess && (
                  <>
                    <OrderDetailsCard
                      {...props}
                      buttonState={!props.order.order_status_button}
                      handleError={handleError}
                    />
                  </>
                )}
                {props.fetchOrderInfoSuccess && <ActivityLogContainer />}
              </Grid>
            </Grid>
            <Grid container spacing={4} id="section2">
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <CustomerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4} id="section3">
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <RetailerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid container spacing={4} id="section4">
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
            <Box display="flex" alignItems="flex-end" flexDirection="column">
              <Button
                title="Order Detail"
                className={activeSection === "section1" ? "active" : null}
                onClick={() => handleScroll("section1")}
              >
                O
              </Button>
              <Button
                title="Customer"
                className={activeSection === "section2" ? "active" : null}
                onClick={() => handleScroll("section2")}
              >
                C
              </Button>
              <Button
                title="Retailer"
                className={activeSection === "section3" ? "active" : null}
                onClick={() => handleScroll("section3")}
              >
                R
              </Button>
              <Button
                title="Delivery Agent"
                className={activeSection === "section4" ? "active" : null}
                onClick={() => handleScroll("section4")}
              >
                D
              </Button>
              <IconButton aria-label="add" onClick={() => handleAddIssue()}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {props.connectCallSuccess && (
        <ErrorMsg show={true} message={props.successMsg} type="success" />
      )}

      {showError && (
        <ErrorMsg
          show={true}
          message={"Cannot cancel at this stage."}
          type="error"
        />
      )}
    </div>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchCancelReason: PropTypes.func,
  cancelReasons: PropTypes.object,
  fetchOrderInfoSuccess: PropTypes.bool,
  fetchOrderInfoFailure: PropTypes.bool,
  fetchCancelReasonSuccess: PropTypes.bool,
  fetchOrderInfoProgress: PropTypes.bool,
  fetchCancelReasonProgress: PropTypes.bool,
  fetchCancelReasonFailure: PropTypes.bool,
  orderId: PropTypes.any,
  order: PropTypes.object,
  createNotes: PropTypes.func,
  connectCall: PropTypes.func,
  from: PropTypes.string,
  connectCallSuccess: PropTypes.bool,
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string,
  activityLog: PropTypes.object,
};

export { OrderInfoComponent };
