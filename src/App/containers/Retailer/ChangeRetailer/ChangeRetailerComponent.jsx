/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../../components/topBar";
import { RetailerCardContainer } from "./RetailerCardContainer";
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

  const handleRetailer = () => {
    console.log("handleRetailer");
  };

  const menuLabels = [
    <Tab
      label="Change Retailer"
      key={"retailerBtn"}
      onClick={handleRetailer}
    />,
  ];

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <Box className={classes.boxContainer}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <RetailerCardContainer />
          </Grid>
          <Grid item xs={4}>
            <RetailerCardContainer />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { ChangeRetailerComponent };
