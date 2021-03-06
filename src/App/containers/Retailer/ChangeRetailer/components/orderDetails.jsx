import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { CartItem } from "./cartItem";

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
    fontWeight: "700",
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
  heading: {
    fontSize: 16,
    fontWeight: "700",
    margin: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  addComponentLeft: {
    border: "1px solid",
    borderRadius: "50% 0 0 50%",
    borderRight: "none",
    "& button": {
      padding: "3px 0 3px 5px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addComponentCenter: {
    border: "1px solid",
    borderRight: "none",
    borderLeft: "none",
    "& p": {
      width: "22px",
      height: "22px",
      display: "block",
      lineHeight: "22px",
      textAlign: "center",
    },
  },
  addComponentRight: {
    border: "1px solid",
    borderRadius: "0 50% 50% 0",
    borderLeft: "none",
    "& button": {
      padding: "3px 5px 3px 0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addMorebutton: {
    width: "30%",
  },
}));

const OrderDetails = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const cartItem = history.location.state.cartItems;

  return (
    <Box>
      <List>
        <ListItem dense disableGutters>
          <Typography variant="h5" className={classes.heading} gutterBottom>
            {props.retailerName}
          </Typography>
        </ListItem>
        <ListItem dense disableGutters>
          <Typography variant="body2" gutterBottom>
            Retailer ID: {props.retailer_id}
          </Typography>
        </ListItem>
        {cartItem.map((value) => {
          return (
            <CartItem
              value={value}
              key={value.sku_id}
              listRetailerData={props.listRetailerData}
            />
          );
        })}
        {/* <ListItem dense disableGutters className={classes.finalRow}>
          <ListItemText primary={"Free Agent/ Total Delivery Agents"} />
          <Box>
            <Typography>
              {props.value.free_da}/{props.value.total_da}
            </Typography>
          </Box>
        </ListItem> */}
      </List>
    </Box>
  );
};

OrderDetails.propTypes = {
  orderInfo: PropTypes.object,
  cartDetails: PropTypes.array,
  listRetailerData: PropTypes.object,
  retailerName: PropTypes.string,
  retailer_id: PropTypes.number,
};

export { OrderDetails };
