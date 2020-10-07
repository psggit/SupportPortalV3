import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Typography } from "@material-ui/core";

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
    <ListItem dense disableGutters>
      <ListItemText
        className={classes.ListItems}
        primary={value.brand_name}
        secondary={`${value.volume} ML | ₹ ${value.sku_price}`}
      />

      <Box className={classes.addComponentLeft}>
        <IconButton style={{ color: "#010B13" }}>
          {props.modify && <RemoveIcon />}
        </IconButton>
      </Box>

      <Box className={classes.addComponentCenter}>
        <Typography>{value.ordered_count}</Typography>
      </Box>

      <Box className={classes.addComponentRight}>
        <IconButton style={{ color: "#010B13" }}>
          {props.modify && <AddIcon />}
        </IconButton>
      </Box>
      {props.modify && (
        <IconButton
          aria-label="delete"
          color="primary"
          className={classes.deleteButton}
        >
          <DeleteOutlineIcon size="small" />
        </IconButton>
      )}
    </ListItem>
  );
};

CartItem.propTypes = {
  value: PropTypes.string,
  modify: PropTypes.bool,
};

export { CartItem };
