import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { Typography } from "@material-ui/core";

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
  deleteButton: {
    padding: "7px 10px",
  },
  cartCounter: {
    backgroundColor: "#fff",
    border: "1px solid #0086AD",
    color: "#0086AD",
    borderRadius: 20,
    padding: 2,
    cursor: "pointer",
    "&::before": {
      content: '"w"',
      paddingLeft: 2,
      color: "#fff",
    },
    "&::after": {
      content: '"w"',
      paddingRight: 2,
      color: "#fff",
    },
  },
}));

const AddItem = (props) => {
  const classes = useStyles();
  const value = props.sku;

  let cartSku = props.cartProducts[value.sku_id];

  if (cartSku === undefined) {
    return (
      <div
        className={classes.cartCounter}
        onClick={(event) => props.addItem(event, value)}
      >
        ADD
      </div>
    );
  }

  return (
    <>
      <Box className={classes.addComponentLeft}>
        <IconButton
          style={{ color: "#010B13" }}
          onClick={(event) => props.removeItem(event, value)}
        >
          <RemoveIcon size="small" fontSize="small" />
        </IconButton>
      </Box>

      <Box className={classes.addComponentCenter}>
        <Typography>{cartSku.ordered_count}</Typography>
      </Box>

      <Box className={classes.addComponentRight}>
        <IconButton
          style={{ color: "#010B13" }}
          onClick={(event) => props.addItem(event, value)}
        >
          <AddIcon size="small" fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
};

AddItem.propTypes = {
  sku: PropTypes.object,
  value: PropTypes.any,
  modify: PropTypes.bool,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  ordered_count: PropTypes.number,
  cartProducts: PropTypes.object,
};

export { AddItem };
