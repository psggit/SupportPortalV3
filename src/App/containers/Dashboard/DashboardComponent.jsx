import React, { useEffect, useState, createRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TopBar from "../../components/topBar";
import ErrorMsg from "../../components/errorMsg";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import { validateNumberField } from "../../utils/validators";
import { ConsumerCard } from "./components/consumerCard";
import { RetailerCard } from "./components/retailerCard";
import { DeliveryAgentCard } from "./components/deliveryAgentCard";
// import { PreponeDeliveryCard } from "./components/preponeCard";
import { DeliveryOrderStatusCard } from "./components/deliveryOrderStatusCard";
import Loading from "../../components/loading";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxContainer: {
    margin: "40px auto",
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
  dialogPopup: {
    textAlign: "center",
  },
}));

const DashboardComponent = (props) => {
  useEffect(() => {
    // console.log("useEffect - Dashboard", localStorage.getItem("x-hasura-role"));
    if (localStorage.getItem("x-hasura-role") === "support_admin") {
      props.fetchDeliveryStatus();
    }
  }, []);
  const classes = useStyles();
  const [payload, setPayload] = useState({
    consumer: {},
    retailer_details: {},
    delivery_agent_details: {},
    assignWarehouse: {},
    orderStatus: {},
    deliver_status: {},
  });
  const [filterType, setFilterType] = useState("");
  const [isFetchDisabled, setFetchState] = useState(true);
  const [isResetDisabled, setResetState] = useState(false);
  const history = useHistory();
  const [errorString, setErrorMessage] = useState({
    status: false,
    fieldName: "",
    fieldValue: "",
  });

  const reference = createRef();

  const handleChange = (event, validationType, filterType, payloadKey) => {
    //TODO:@Purva: OTP validation pending
    if (validationType == "Mobile Number" && event.target.value.length == 10) {
      const msg = validateNumberField({
        fieldName: validationType,
        fieldValue: event.target.value,
        filterType: filterType,
      });
      setErrorMessage({ ...errorString, ...msg });
      if (msg.status == true) {
        setFetchState(true);
      }
    } else {
      setErrorMessage({
        ...errorString,
        status: false,
        value: "",
        fieldName: "",
        fieldValue: "",
        filterType: "",
      });
      setFetchState(true);
    }

    let previousPayload = payload[filterType];
    if (!isNaN(event.target.value)) {
      let updatedPayload = {
        [filterType]: {
          ...previousPayload,
          [payloadKey]: event.target.value,
        },
      };
      setPayload({
        ...payload,
        ...updatedPayload,
      });
      setFilterType(filterType);
      setResetState(false);
    }
    // console.log(event.target.value, filterType, payloadKey);
    if (payloadKey == "delivery_status") {
      // console.log("delivery_status");
      let updatedPayload = {
        [filterType]: {
          [payloadKey]: event.target.value,
        },
      };
      setPayload({
        ...payload,
        ...updatedPayload,
      });
      setFilterType(filterType);
      setResetState(false);
    }
  };

  const reset = (type) => {
    //TODO:@Purva: RESET button enable/disable set not working
    let newPayload = {
      ...payload,
      [type]: {},
    };
    setPayload(newPayload);
    setErrorMessage({
      ...errorString,
      status: false,
      value: "",
      fieldName: "",
      fieldValue: "",
      filterType: "",
    });
    setResetState(true);
    setFilterType(type);
  };

  const handleSubmit = (type) => {
    let sendPayload = {
      pagination: {
        limit: 25,
        offset: 0,
      },
      filter: payload[type],
    };
    if (type === "assignWarehouse") {
      sendPayload = sendPayload.filter;
      props.preponeOrder(sendPayload);
    } else {
      props.fetchOrderDetails(sendPayload);
      window.sessionStorage.setItem(
        "dashboardPayload",
        JSON.stringify({ filter: sendPayload.filter })
      );
      history.push("/order-details");
    }
  };

  // console.log("deliveryStatus", props);

  return (
    <Container component="main">
      <TopBar />
      {props.fetchDetailsProgress && <Loading message="Fetching data..." />}
      {props.fetchDetailsFail && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
      {props.preponeOrderSuccess && (
        <ErrorMsg
          show={true}
          message={props.successMsg.message}
          type={"success"}
        />
      )}
      <Box maxWidth="80%" className={classes.boxContainer} ref={reference}>
        <Grid container spacing={4} justify="center">
          {localStorage.getItem("x-hasura-role") !== "ops_delivery_manager" && (
            <Grid item xs={4}>
              <ConsumerCard
                errorString={errorString}
                handleChange={handleChange}
                isResetDisabled={isResetDisabled}
                isFetchDisabled={isFetchDisabled}
                handleSubmit={handleSubmit}
                reset={reset}
                payload={payload}
                filterType={filterType}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            <RetailerCard
              errorString={errorString}
              handleChange={handleChange}
              isResetDisabled={isResetDisabled}
              isFetchDisabled={isFetchDisabled}
              handleSubmit={handleSubmit}
              reset={reset}
              payload={payload}
              filterType={filterType}
            />
          </Grid>
          <Grid item xs={4}>
            <DeliveryAgentCard
              errorString={errorString}
              handleChange={handleChange}
              isResetDisabled={isResetDisabled}
              isFetchDisabled={isFetchDisabled}
              handleSubmit={handleSubmit}
              reset={reset}
              payload={payload}
              filterType={filterType}
            />
          </Grid>
          {/* <Grid item xs={4}>
            <PreponeDeliveryCard
              errorString={errorString}
              handleChange={handleChange}
              isResetDisabled={isResetDisabled}
              isFetchDisabled={isFetchDisabled}
              handleSubmit={handleSubmit}
              reset={reset}
              payload={payload}
              filterType={filterType}
            />
          </Grid> */}
          {localStorage.getItem("x-hasura-role") === "support_admin" && (
            <Grid item xs={4}>
              <DeliveryOrderStatusCard
                errorString={errorString}
                handleChange={handleChange}
                isResetDisabled={isResetDisabled}
                isFetchDisabled={props.fetchDeliveryFailed}
                handleSubmit={handleSubmit}
                reset={reset}
                payload={payload}
                filterType={filterType}
                data={props.deliveryStatus}
                fetchDeliverySuccess={props.fetchDeliverySuccess}
                fetchDeliveryFailed={props.fetchDeliveryFailed}
                fetchDeliveryProgress={props.fetchDeliveryProgress}
                errorMessageDeliveryStatus={props.errorMessageDeliveryStatus}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

DashboardComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  fetchDeliveryStatus: PropTypes.func,
  preponeOrder: PropTypes.func,
  orderData: PropTypes.object,
  fetchDetailsProgress: PropTypes.bool,
  fetchDeliveryFailed: PropTypes.bool,
  fetchDeliveryProgress: PropTypes.bool,
  fetchDetailsFail: PropTypes.bool,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
  fetchDeliverySuccess: PropTypes.bool,
  deliveryStatus: PropTypes.array,
  preponeOrderSuccess: PropTypes.bool,
  errorMessageDeliveryStatus: PropTypes.string,
};

export { DashboardComponent };
