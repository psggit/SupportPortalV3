import React, { useEffect, useState } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
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
    // console.log("DashboardComponent");
    // userAuthAPI(null, onProcess, onSuccess, onError);
  }, []);
  const classes = useStyles();
  const [payload, setPayload] = useState({
    consumer: {},
    retailer_details: {},
    delivery_agent_details: {},
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
    const sendPayload = {
      pagination: {
        limit: 25,
        offset: 0,
      },
      filter: payload[type],
    };
    props.fetchOrderDetails(sendPayload);
  };

  if (props.fetchDetailsSuccess) {
    history.push("/order-details");
  }

  return (
    <Container component="main">
      <TopBar />
      {props.fetchDetailsProgress ? (
        <Dialog className={classes.dialogPopup} open={open} maxWidth="sm">
          <DialogTitle id="simple-dialog-title">Fetching data...</DialogTitle>
          <Box pb={3}>
            <CircularProgress />
          </Box>
        </Dialog>
      ) : (
        ""
      )}
      {props.fetchDetailsFail && (
        <ErrorMsg
          show={true}
          message="Something went wrong, try again later."
        />
      )}
      <Box maxWidth="80%" className={classes.boxContainer}>
        <Grid container spacing={4}>
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
        </Grid>
      </Box>
    </Container>
  );
};

DashboardComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  orderData: PropTypes.object,
  fetchDetailsSuccess: PropTypes.bool,
  fetchDetailsProgress: PropTypes.bool,
  fetchDetailsFail: PropTypes.bool,
};

export { DashboardComponent };