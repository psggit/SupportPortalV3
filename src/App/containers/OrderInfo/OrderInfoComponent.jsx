import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Paper, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsContainer } from "./OrderCard/OrderDetailsContainer";
import { CustomerContainer } from "./CustomerDetails/CustomerContainer";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { OrderStatusContainer } from "./OrderStatus";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import DialogComponent from "../../components/dialog";
import Loading from "../../components/loading";
import ErrorMsg from "../../components/errorMsg";
import { ActivityLogContainer } from "./ActivityLogs";
import {
  Fab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.body1.fontFamily,
  },
  boxContainer: {
    fontFamily: theme.typography.body1.fontFamily,
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
  fixedSideBar: {
    height: "100%",
    position: "fixed",
    right: 0,
    top: 60,
    padding: 10,
    paddingTop: 20,
  },
  fabBtn: {
    marginTop: 150,
  },
  sideNavBtnO: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    height: 24,
    width: 24,
    minWidth: 24,
    fontSize: 18,
    margin: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnC: {
    backgroundColor: "#FB337A",
    color: "#fff",
    height: 24,
    width: 24,
    minWidth: 24,
    fontSize: 18,
    margin: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#FB337A",
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnR: {
    backgroundColor: "#F4A60B",
    color: "#fff",
    height: 24,
    width: 24,
    minWidth: 24,
    fontSize: 18,
    margin: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F4A60B",
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnD: {
    backgroundColor: "#1B4987",
    color: "#fff",
    height: 24,
    width: 24,
    minWidth: 24,
    fontSize: 18,
    margin: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1B4987",
      textDecoration: "underline",
      color: "#fff",
    },
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
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
      props.fetchIssueTypes();
    }
  }, [props.fetchOrderInfoSuccess]);

  let loading = props.fetchOrderInfoProgress;
  const [selectedValue, handleSelect] = useState("");
  const [issueType, setIssueType] = useState(null);
  const [newIssueDesc, setNewIssueDesc] = useState("");
  const [issueDesc, setIssueDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);
  const [showError, setShowError] = useState(false);

  const [activeSection, setActiveSection] = useState("");

  const handleSelectChange = (event) => {
    handleSelect(event.target.value);
  };

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

  const updateIssue = () => {
    const payload = {
      order_id: props.orderId,
      reason: selectedValue,
    };
    props.submitIssue(payload);
    handleAddIssue();
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

  const dialogActionsIssue = [
    <Button
      variant="outlined"
      color="primary"
      key="closeDialog"
      onClick={() => handleAddIssue()}
    >
      Cancel
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="createIssue"
      onClick={() => updateIssue()}
    >
      Save
    </Button>,
  ];

  if (loading) {
    return <Loading message="Loading..." />;
  }

  if (props.fetchOrderInfoFailure) {
    return (
      <ErrorMsg
        show={true}
        message={
          props.errorMsg !== "" ? props.errorMsg : "Something went wrong"
        }
        type={"error"}
      />
    );
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
          actions={dialogActionsIssue}
          openDialog={handleAddIssue}
        >
          {props.fetchOrderInfoSuccess && (
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">
                Select Reason
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(event) => handleSelectChange(event)}
              >
                {props.fetchOrderInfoSuccess &&
                  props.issueTypes.issue_types.map((value) => {
                    if (selectedValue === value) {
                      return (
                        <MenuItem
                          value={value.issue_type}
                          key={value.issue_id}
                          selected={true}
                        >
                          {value.issue_label}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem value={value.issue_type} key={value.issue_id}>
                          {value.issue_label}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
          )}
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
            <Grid container spacing={4}>
              <Grid item xs={6}>
                {props.fetchOrderInfoSuccess && <CartContainer {...props} />}
              </Grid>
              <Grid item xs={6} id="section1">
                {/* {props.fetchOrderInfoSuccess && (
                  <>
                    <OrderDetailsContainer
                      {...props}
                      buttonState={!props.order.order_status_button}
                      handleError={handleError}
                    />
                  </>
                )}
                {props.fetchOrderInfoSuccess && <ActivityLogContainer />} */}
                {/* {props.fetchOrderInfoSuccess && (
                  <Box mt={4}>
                    <ActivityLogContainer />
                  </Box>
                )} */}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              id="section2"
              className={classes.marginTop}
            >
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <CustomerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              id="section3"
              className={classes.marginTop}
            >
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <RetailerContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              id="section4"
              className={classes.marginTop}
            >
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
          <Grid item xs={1} boxshadow={1}>
            <Paper elevation={4} className={classes.fixedSideBar}>
              <Box display="flex" alignItems="flex-end" flexDirection="column">
                <Button
                  title="Order Detail"
                  className={activeSection === "section1" ? "active" : null}
                  classes={{ root: classes.sideNavBtnO }}
                  onClick={() => handleScroll("section1")}
                >
                  O
                </Button>
                <Button
                  title="Customer"
                  className={activeSection === "section2" ? "active" : null}
                  classes={{ root: classes.sideNavBtnC }}
                  onClick={() => handleScroll("section2")}
                >
                  C
                </Button>
                <Button
                  title="Retailer"
                  className={activeSection === "section3" ? "active" : null}
                  classes={{ root: classes.sideNavBtnR }}
                  onClick={() => handleScroll("section3")}
                >
                  R
                </Button>
                <Button
                  title="Delivery Agent"
                  className={activeSection === "section4" ? "active" : null}
                  classes={{ root: classes.sideNavBtnD }}
                  onClick={() => handleScroll("section4")}
                >
                  D
                </Button>
                <Box>
                  <Fab
                    size="small"
                    color="primary"
                    className={classes.fabBtn}
                    aria-label="add"
                    onClick={() => handleAddIssue()}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Box>
            </Paper>
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
      {props.submitIssueSuccess && (
        <ErrorMsg show={true} message={props.successMsg} type="success" />
      )}
    </div>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchCancelReason: PropTypes.func,
  fetchIssueTypes: PropTypes.func,
  cancelReasons: PropTypes.array,
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
  issueTypes: PropTypes.object,
  submitIssue: PropTypes.func,
  submitIssueSuccess: PropTypes.bool,
};

export { OrderInfoComponent };
