import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { AddItem } from "./addItem";

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
    color: "#606060",
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
  deleteButton: {
    padding: "7px 10px",
  },
}));

const CartItem = (props) => {
  const classes = useStyles();
  const value = props.value;

  if (props)
    return (
      <ListItem dense disableGutters>
        <ListItemText
          className={classes.ListItems}
          primary={""}
          secondary={`${value.volume} ML | ₹ ${value.price}`}
        />
        <AddItem
          sku={value}
          cartProducts={props.cartProducts}
          addItem={props.addItem}
          removeItem={props.removeItem}
        />
        {/* {props.modify && (
          <IconButton
            aria-label="delete"
            color="primary"
            className={classes.deleteButton}
            onClick={() => props.removeItem()}
          >
            <DeleteOutlineIcon size="small" fontSize="small" />
          </IconButton>
        )} */}
      </ListItem>
    );
};

CartItem.propTypes = {
  value: PropTypes.any,
  modify: PropTypes.bool,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  ordered_count: PropTypes.number,
  cartProducts: PropTypes.object,
};

export { CartItem };
