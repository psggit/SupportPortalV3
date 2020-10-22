import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import { CartItem } from "./cartItem";
import { ListItemText, Box, Divider } from "@material-ui/core";

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
    width: "50%",
    display: "inline-block",
    float: "left",
    padding: "0 20px",
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
            key={value.sku_id}
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