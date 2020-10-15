import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { List, Typography } from "@material-ui/core";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
  CartComponent: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItems: {
    color: "#010B13",
  },
  ListItemRoot: {
    width: "100%",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
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
  addComponentLeft: {
    border: "1px solid #C7C7C7",
    borderRadius: "50% 0 0 50%",
    borderRight: "none",
    height: "24px",
    width: "20px",
    color: "#010B13",
    "& button": {
      padding: "3px 0 3px 5px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addComponentCenter: {
    border: "1px solid #C7C7C7",
    borderRight: "none",
    borderLeft: "none",
    color: "#010B13",
    "& p": {
      width: "22px",
      height: "22px",
      display: "block",
      lineHeight: "22px",
      textAlign: "center",
    },
  },
  addComponentBottom: {
    color: "#010B13",
    "& p": {
      marginTop: "30px",
    },
  },
  counterAvailable: {
    border: "1px solid #C7C7C7",
    borderRadius: "12px",
    textAlign: "center",
    width: "56px",
    color: "green",
  },
  counterUnAvailable: {
    border: "1px solid #C7C7C7",
    borderRadius: "12px",
    textAlign: "center",
    width: "56px",
    color: "red",
  },
  addComponentRight: {
    border: "1px solid #C7C7C7",
    borderRadius: "0 50% 50% 0",
    borderLeft: "none",
    height: "24px",
    width: "20px",
    "& button": {
      padding: "3px 5px 3px 0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
}));

const CartItem = (props) => {
  const classes = useStyles();
  const value = props.value;
  return (
    <List>
      <ListItem>
        <ListItemText
          className={classes.ListItems}
          primary={value.brand_name}
          secondary={`${value.volume} ML | ₹ ${value.sku_price}`}
        />
        <div>
          <Typography
            className={
              value.ordered_count === 1
                ? classes.counterAvailable
                : classes.counterUnAvailable
            }
          >
            {value.ordered_count}
          </Typography>
          <Typography>{"Available"}</Typography>
        </div>
      </ListItem>
    </List>
  );
};

CartItem.propTypes = {
  value: PropTypes.string,
};

export { CartItem };
