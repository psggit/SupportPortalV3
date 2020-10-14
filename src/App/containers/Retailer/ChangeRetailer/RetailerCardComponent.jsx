import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import { OrderDetails } from "./components/orderDetails";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
    fontFamily: theme.typography.fontFamily,
  },
  RetailerCardComponent: {
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItemRoot: {
    width: "100%",
    fontSize: 16,
    color: "#606060",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
    textAlign: "right",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  buttonDiv: {
    textAlign: "right",
    justifyContent: "space-between",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionContainer: {
    padding: 0,
  },
  marginLeft: {
    marginLeft: "auto",
  },
}));

const RetailerCardComponent = (props) => {
  useEffect(() => {
    console.log("RetailerCardComponent");
    console.dir(props);
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.RetailerCardComponent} variant="outlined">
      <CardContent p={2}>
        <OrderDetails {...props} />
        <ListItem dense disableGutters>
          <ListItemText primary={"Free Agent/ Total Delivery Agents"} />
          <Box>
            <Typography>{"2/10"}</Typography>
          </Box>

          <Box className={classes.addComponentRight} />
        </ListItem>
        <CardActions className={classes.actionContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.marginLeft}
            size="small"
          >
            Call
          </Button>
          <Button variant="contained" color="primary" size="small">
            Select
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

RetailerCardComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  orderInfo: PropTypes.object,
};

export { RetailerCardComponent };
