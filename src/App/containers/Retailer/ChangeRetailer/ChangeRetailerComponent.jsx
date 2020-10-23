/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    let skuId = props.orderDetails.cart_items.map((item) => item.sku_id);
    const payload = {
      sku_ids: skuId,
      retailer_id: parseInt(props.orderDetails.retailer_id),
      city_id: props.orderDetails.city_id,
    };
    props.listRetailer(payload);
  }, []);

  const handleBack = () => {
    history.push(`/order-info/${props.orderId}`);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("ChangeRetailerCardComponent", props);

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <Paper className={classes.paper}>
        <Grid alignItems="center" container>
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
      <Box className={classes.boxContainer}>
        <Grid container spacing={4}>
          {props.listRetailerSuccess &&
            props.listRetailerData.da_info.map((value) => (
              <Grid item xs={4}>
                <RetailerCardContainer
                  retailerName={value.retailer_name}
                  value={value}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

ChangeRetailerComponent.propTypes = {
  listRetailerData: PropTypes.object,
  listRetailer: PropTypes.func,
  listRetailerSuccess: PropTypes.bool,
  listRetailerFailed: PropTypes.bool,
  listRetailerProgres: PropTypes.bool,
  orderDetails: PropTypes.object,
  orderId: PropTypes.string,
};

export { ChangeRetailerComponent };
