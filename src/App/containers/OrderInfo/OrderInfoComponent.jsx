import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../components/topBar";
import { useHistory } from "react-router-dom";
import { CartContainer } from "../Cart/CartContainer";
import { OrderDetailsContainer } from "./OrderCard/OrderDetailsContainer";
import { OrderModificationContainer } from "./ModificationDetails/OrderModificationContainer";
import { CustomerContainer } from "./CustomerDetails/CustomerContainer";
import { RetailerContainer } from "./RetailerDetails/RetailerContainer";
import { OrderStatusContainer } from "./OrderStatus";
import { DeliveryAgentContainer } from "./DeliveryAgent";
import { OrderTrackingContainer } from "../OrderTracking";
import { DeliveryServiceProviderContainer } from "./DeliveryServiceProvider";
import DialogComponent from "../../components/dialog";
import Loading from "../../components/loading";
import ErrorMsg from "../../components/errorMsg";
import { ActivityLogContainer } from "./ActivityLogs";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import SideNav from "./components/sideNav";
import uuid from "react-uuid";
import Alert from "@material-ui/lab/Alert";
import { CancellationSummaryContainer } from "./../CancellationSummary";

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
  marginTop: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    minWidth: 200,
  },
  selectBox: {
    width: "100%",
  },
  textField: {
    marginTop: "16px",
  },
}));

const OrderInfoComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  let { orderId } = useParams();
  const [modifyCart, setModifyCart] = useState("");

  useEffect(() => {
    // console.log("OrderInfoComponent", props.retailerIssueListData);
    if (orderId === null || orderId == "") {
      history.push("/dashboard");
    } else {
      props.fetchOrderInfo(orderId);
    }

    if (history.location.state !== undefined) {
      if ("modifyCartInfo" in history.location.state) {
        setModifyCart(history.location.state.modifyCartInfo);
      }
    }
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    if (props.fetchOrderInfoSuccess) {
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
  const [createDisabledBtn, setDisabledBtn] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [valueSelected, setValue] = useState(null);

  const validateIssue = (event, type) => {
    if (type === "select") {
      var selectValue = event.target.value;
      handleSelect(event.target.value);
    }
    if (
      newIssueDesc.trim().length !== 0 &&
      (selectValue !== "" || selectedValue !== "")
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  useEffect(() => {
    const payload = {
      pending_request: true,
      completed_request: true,
      order_id: orderId,
      limit: 1000,
      offset: 0,
    };
    props.fetchListOrderModification(payload);
    // if (
    //   localStorage.getItem("x-hasura-role") !== "ops_delivery_manager" ||
    //   localStorage.getItem("x-hasura-role") !== "support_person"
    // ) {
    //   props.fetchListOrderModification(payload);
    // }
  }, []);

  const textFieldChange = (e) => {
    setIssueDesc(e.target.value);
    setDisableBtn(false);
    // console.log("valueSelected", valueSelected);
    if (e.target.value.trim().length > 0 && valueSelected !== null) {
      setDisableBtn(true);
    }
  };

  const handleScroll = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const handleAddIssue = () => {
    setOpenIssueDialog(!openIssueDialog);
    setNewIssueDesc("");
    handleSelect("");
    setDisabledBtn(true);
  };

  const handleError = () => {
    // alert("");
    // setShowError(!showError);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
    // const payload = {
    //   to: to,
    //   from: props.from,
    // };
    // props.connectCall(payload);
  };

  const updateNotes = () => {
    var payload = null;
    if (issueType === "retailer") {
      payload = {
        order_id: orderId,
        type: issueType,
        notes: issueDesc,
        retailer_issue_type: parseInt(valueSelected),
      };
    } else if (issueType === "customer") {
      payload = {
        order_id: orderId,
        type: issueType,
        notes: issueDesc,
        consumer_issue_type: parseInt(valueSelected),
      };
    } else {
      payload = {
        order_id: orderId,
        type: issueType,
        notes: issueDesc,
        da_note_type: parseInt(valueSelected),
      };
    }
    // let payload = {
    //   order_id: orderId,
    //   type: issueType,
    //   notes: issueDesc,
    //   issue_type: "",
    //   consumer_issue_type: valueSelected.toString(),
    //   retailer_issue_type: "",
    // };
    props.createNotes(payload);
    setOpen(false);
    setIssueDesc("");
    props.fetchOrderInfo(orderId);
  };

  const updateIssue = () => {
    const payload = {
      order_id: props.orderId,
      reason: selectedValue,
      description: newIssueDesc,
    };
    // console.log(payload);
    props.submitIssue(payload);
    handleAddIssue();
  };

  const dialogActions = [
    <Button
      variant="outlined"
      color="primary"
      key={uuid()}
      onClick={() => openDialog(null)}
    >
      Cancel
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key={uuid()}
      onClick={() => updateNotes()}
      disabled={!disableBtn}
    >
      Save
    </Button>,
  ];

  const dialogActionsIssue = [
    <Button
      variant="outlined"
      color="primary"
      key={uuid()}
      onClick={() => handleAddIssue()}
    >
      Cancel
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key={uuid()}
      onClick={() => updateIssue()}
      disabled={createDisabledBtn}
    >
      Create Issue
    </Button>,
  ];

  if (loading) {
    return <Loading message="Loading..." />;
  }

  // console.log("[orderinfo]", props);

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
      {open && issueType === "retailer" && (
        <DialogComponent
          title="ADD NOTE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
          openDialog={openDialog}
        >
          {props.fetchRetailerIssueListSuccess && issueType === "retailer" && (
            <>
              <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.selectBox}
                onChange={(event) => handleChange(event)}
              >
                {props.retailerIssueListData !== null &&
                  props.retailerIssueListData.map((value, index) => {
                    if (valueSelected === value) {
                      return (
                        <MenuItem value={value.id} key={index} selected={true}>
                          {value.code}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem value={value.id} key={index}>
                          {value.code}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
              <TextField
                id="outlined-textarea"
                placeholder="Add note here"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={issueDesc}
                fullWidth
                className={classes.textField}
                //onChange={(event) => setIssueDesc(event.target.value)}
                onChange={textFieldChange}
              />
            </>
          )}
          {props.fetchRetailerIssueListFailure && (
            <Alert severity="error">{props.errorMessageRetailerList}</Alert>
          )}
        </DialogComponent>
      )}
      {open && issueType === "customer" && (
        <DialogComponent
          title="ADD NOTE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
          openDialog={openDialog}
        >
          {props.NoteListSuccess && issueType === "customer" && (
            <>
              <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.selectBox}
                onChange={(event) => handleChange(event)}
              >
                {props.noteListData !== null &&
                  props.noteListData.map((value, index) => {
                    if (valueSelected === value) {
                      return (
                        <MenuItem value={value.id} key={index} selected={true}>
                          {value.code}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem value={value.id} key={index}>
                          {value.code}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
              <TextField
                id="outlined-textarea"
                placeholder="Add note here"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={issueDesc}
                fullWidth
                className={classes.textField}
                //onChange={(event) => setIssueDesc(event.target.value)}
                onChange={textFieldChange}
              />
            </>
          )}
          {props.fetchCustomerNotesFailed && (
            <Alert severity="error">{props.errorMessageCustomerNotes}</Alert>
          )}
        </DialogComponent>
      )}
      {open && issueType === "delivery_agent" && (
        <DialogComponent
          title="ADD NOTE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActions}
          openDialog={openDialog}
        >
          {props.fetchDaIssueListSuccess && issueType === "delivery_agent" && (
            <>
              <InputLabel id="demo-simple-select-label">Issue Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.selectBox}
                onChange={(event) => handleChange(event)}
              >
                {props.daIssueList !== null &&
                  props.daIssueList.map((value, index) => {
                    if (valueSelected === value) {
                      return (
                        <MenuItem value={value.id} key={index} selected={true}>
                          {value.code}
                        </MenuItem>
                      );
                    } else {
                      return (
                        <MenuItem value={value.id} key={index}>
                          {value.code}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
              <TextField
                id="outlined-textarea"
                placeholder="Add note here"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={issueDesc}
                fullWidth
                className={classes.textField}
                //onChange={(event) => setIssueDesc(event.target.value)}
                onChange={textFieldChange}
              />
            </>
          )}
          {props.fetchDaIssueListFailure && (
            <Alert severity="error">{props.errorDAList}</Alert>
          )}
        </DialogComponent>
      )}
      {openIssueDialog && (
        <DialogComponent
          title="ADD NEW ISSUE"
          subtitle={`Order ID: ` + orderId}
          actions={dialogActionsIssue}
          openDialog={handleAddIssue}
        >
          {props.fetchOrderInfoSuccess && props.fetchIssueTypesSuccess && (
            <>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Select Reason
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(event) => validateIssue(event, "select")}
                >
                  {props.issueTypes.issue_types.map((value) => {
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
              <TextField
                id="outlined-textarea"
                placeholder="Add issue description"
                multiline
                rows={4}
                variant="outlined"
                size="small"
                value={newIssueDesc}
                fullWidth
                onKeyUp={(event) => validateIssue(event, "text")}
                onChange={(event) => setNewIssueDesc(event.target.value)}
              />
            </>
          )}
          {props.fetchIssueTypesFailed && (
            <Alert severity="error">{props.errorMsgIssueTypes}</Alert>
          )}
        </DialogComponent>
      )}
      <Box className={classes.boxContainer}>
        <Grid container spacing={4} className={classes.containerBox}>
          <Grid item xs={3}>
            <Box ml={2}>
              {props.fetchOrderInfoSuccess && <OrderStatusContainer />}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                {props.fetchOrderInfoSuccess && (
                  <CartContainer
                    modifyCart={modifyCart}
                    buttonState={props.order.order_status_button}
                  />
                )}
                {props.fetchOrderInfoSuccess &&
                  props.order.cancellation_summary !== null && (
                    <Box className={classes.marginTop}>
                      <CancellationSummaryContainer />
                    </Box>
                  )}
              </Grid>
              <Grid item xs={6} id="section1">
                {props.fetchOrderInfoSuccess && (
                  <>
                    <OrderDetailsContainer
                      {...props}
                      buttonState={!props.order.order_status_button}
                      handleError={handleError}
                    />
                  </>
                )}
                {props.fetchOrderInfoSuccess &&
                  localStorage.getItem("x-hasura-role") !==
                    "ops_delivery_manager" &&
                  localStorage.getItem("x-hasura-role") !==
                    "support_person" && (
                    <Box mt={4}>
                      <ActivityLogContainer />
                    </Box>
                  )}
              </Grid>
            </Grid>
            {localStorage.getItem("x-hasura-role") !==
              "ops_delivery_manager" && (
              <Grid
                container
                spacing={4}
                id="section2"
                className={classes.marginTop}
              >
                {props.fetchModificationSuccess &&
                  props.orderList.order_modification.length > 0 && (
                    <Grid item xs={12}>
                      <OrderModificationContainer />
                    </Grid>
                  )}
                <Grid item xs={12}>
                  {props.fetchOrderInfoSuccess && (
                    <CustomerContainer
                      openDialog={openDialog}
                      handleCall={handleCall}
                    />
                  )}
                </Grid>
              </Grid>
            )}
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
              <Grid item xs={12}>
                {props.fetchOrderInfoSuccess && (
                  <DeliveryServiceProviderContainer
                    openDialog={openDialog}
                    handleCall={handleCall}
                  />
                )}
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              id="section5"
              className={classes.marginTop}
            >
              <Grid item xs={12}>
                {localStorage.getItem("x-hasura-role") !==
                  "ops_delivery_manager" &&
                  props.fetchOrderInfoSuccess &&
                  props.order.delivery_status === "Out for Delivery" && (
                    <OrderTrackingContainer
                      orderId={props.orderId}
                      orderInfo={props.order}
                    />
                  )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} boxshadow={1}>
            <SideNav
              handleScroll={handleScroll}
              handleAddIssue={handleAddIssue}
              activeSection={activeSection}
              delivery_state={
                props.fetchOrderInfoSuccess && props.order.delivery_status
              }
            />
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
      {props.createNotesSuccess && (
        <ErrorMsg show={true} message={props.successMsg} type="success" />
      )}
    </div>
  );
};

OrderInfoComponent.propTypes = {
  fetchOrderInfo: PropTypes.func,
  fetchIssueTypes: PropTypes.func,
  fetchOrderInfoSuccess: PropTypes.bool,
  fetchOrderInfoFailure: PropTypes.bool,
  fetchOrderInfoProgress: PropTypes.bool,
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
  createNotesSuccess: PropTypes.bool,
  fetchDaIssueListFailure: PropTypes.bool,
  resetOnUnmount: PropTypes.func,
  NoteListSuccess: PropTypes.bool,
  noteListData: PropTypes.any,
  retailerIssueListData: PropTypes.any,
  fetchRetailerIssueListSuccess: PropTypes.bool,
  fetchDaIssueListSuccess: PropTypes.bool,
  daIssueList: PropTypes.any,
  fetchCustomerNotesFailed: PropTypes.bool,
  fetchIssueTypesSuccess: PropTypes.bool,
  fetchIssueTypesFailed: PropTypes.bool,
  errorMsgIssueTypes: PropTypes.string,
  fetchModificationSuccess: PropTypes.bool,
  orderList: PropTypes.any,
};

export { OrderInfoComponent };
