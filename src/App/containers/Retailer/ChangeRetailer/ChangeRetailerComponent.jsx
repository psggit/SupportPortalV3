/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../../components/topBar";
import { RetailerCardContainer } from "./RetailerCardContainer";
import FullWidthTabs from "../../../components/menuBar";
import { Tab } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.body1,
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
    location.href = "/dashboard";
    console.log("handleBack");
  };

  const handleRetailer = () => {
    console.log("handleRetailer");
  };

  const menuLabels = [
    <Tab label={<ArrowBackIcon />} onClick={handleBack} />,
    <Tab label="Change Retailer" onClick={handleRetailer} />,
  ];

  console.log("ChangeRetailerCardComponent", props);

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <FullWidthTabs labels={menuLabels} />
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
        {/* <Grid container spacing={4}>
          <Grid item xs={4}>
            <RetailerCardContainer />
          </Grid>
        </Grid> */}
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
};

export { ChangeRetailerComponent };
