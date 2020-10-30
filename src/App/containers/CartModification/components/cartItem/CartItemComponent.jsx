import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import { CartItem } from "./cartItem";
import { ListItemText, Box, Divider } from "@material-ui/core";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  boxContainer: {
    fontFamily: theme.typography.body1,
    backgroundColor: "#fff",
    padding: 15,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  btn: {
    textDecoration: "underline",
  },
  cartItem: {
    display: "inline-block",
    padding: "0 20px",
    margin: "0 0 1em",
    width: "100%",
  },
  ListItemText: {
    marginTop: 15,
  },
}));

CartItemComponent.propTypes = {
  product: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  retailer: PropTypes.object,
  ordered_count: PropTypes.number,
  cartProducts: PropTypes.object,
  skuData: PropTypes.any,
};

function CartItemComponent(props) {
  const classes = useStyles();
  const { product, removeItem, addItem, ordered_count } = props;

  return (
    <Box className={classes.cartItem}>
      <ListItemText
        primary={product.brand_name}
        className={classes.ListItemText}
      />
      {product.sku.map((value) => {
        return (
          <CartItem
            ordered_count={ordered_count}
            value={value}
            key={uuid()}
            modify={true}
            removeItem={removeItem}
            addItem={addItem}
            cartProducts={props.cartProducts}
          />
        );
      })}
      <Divider />
    </Box>
  );
}

export { CartItemComponent };
