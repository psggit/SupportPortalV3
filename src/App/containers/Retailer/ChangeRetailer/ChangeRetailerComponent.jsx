import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TopBar from "../../../components/topBar";
import { RetailerCardContainer } from "./RetailerCardContainer";

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

const ChangeRetailerComponent = () => {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.root}>
      <TopBar />
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Change Retailer</div>
        </div>
      </div>
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
