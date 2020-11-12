/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../../components/topBar";
import { RetailerCardContainer } from "./RetailerCardContainer";
import { Tab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Loading from "../../../components/loading";
import ErrorMsg from "../../../components/errorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.body1,
  },
  paper: {
    cursor: "pointer",
    alignItems: "center",
    paddingBottom: "5px",
    width: "100%",
    margin: 0,
  },
  containerBox: {
    width: "100%",
    margin: 0,
  },
  navBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "24px",
    color: "#696969",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "21px",
  },
  navContent: {
    marginLeft: "22px",
  },
  boxContainer: {
    margin: "0 auto",
    fontFamily: theme.typography,
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

const ChangeRetailerComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const retailerId = history.location.state.retailerId;
  const cityId = history.location.state.cityId;
  const stateId = history.location.state.stateId;
  const skuId = history.location.state.skuId;
  const orderId = history.location.state.orderId;
  const orderInfo = history.location.state.orderInfo;

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const payload = {
      sku_ids: skuId,
      retailer_id: parseInt(retailerId),
      state_id: stateId,
      city_id: cityId,
    };
    props.listRetailer(payload);
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  const handleBack = () => {
    history.push(`/order-info/${orderId}`);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  let loading = props.listRetailerProgress;

  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <div component="main" className={classes.root}>
      <TopBar />
      <Paper className={classes.paper}>
        <Grid alignItems="center" container className={classes.containerBox}>
          <Grid item xs={1}>
            <Button
              color="primary"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={handleBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label={<Button color="primary">Change Retailer</Button>} />,
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      {props.listRetailerFailed && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
      <Box className={classes.boxContainer}>
        <Grid container spacing={4} className={classes.containerBox}>
          {props.listRetailerSuccess &&
            props.listRetailerData.da_info.map((value) => (
              <Grid item xs={4}>
                <RetailerCardContainer
                  retailerName={value.retailer_name}
                  retailer_id={value.retailer_id}
                  value={value}
                  orderInfos={orderInfo}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

ChangeRetailerComponent.propTypes = {
  listRetailerData: PropTypes.object,
  listRetailer: PropTypes.func,
  listRetailerSuccess: PropTypes.bool,
  listRetailerFailed: PropTypes.bool,
  listRetailerProgress: PropTypes.bool,
  orderDetails: PropTypes.object,
  orderId: PropTypes.string,
  errorMsg: PropTypes.any,
  resetOnUnmount: PropTypes.func,
};

export { ChangeRetailerComponent };
