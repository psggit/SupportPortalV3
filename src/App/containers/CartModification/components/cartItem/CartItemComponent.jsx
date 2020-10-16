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
}));

function getSkuFromProduct(product) {
  return {
    // retailerId: retailer.id,
    // retailerName: retailer.name,
    // retailerDescription: retailer.description,
    sku_id: product.sku_id,
    brand_name: product.brand_name,
    brand_id: product.brand_id,
    sku_price: product.price,
    volume: product.volume,
    clearCart: false,
  };
}

CartItemComponent.propTypes = {
  product: PropTypes.object,
  addItem: PropTypes.func,
  removeItem: PropTypes.func,
  retailer: PropTypes.object,
  ordered_count: PropTypes.number,
};

function CartItemComponent(props) {
  const classes = useStyles();
  const { product, removeItem, addItem, ordered_count } = props;

  return (
    <Box className={classes.cartItem}>
      <ListItemText primary={product.brand_name} />
      {product.sku.map((value) => {
        let sku = getSkuFromProduct(value);
        return (
          <CartItem
            ordered_count={ordered_count}
            value={sku}
            key={value.sku_id}
            modify={true}
            removeItem={removeItem}
            addItem={addItem}
          />
        );
      })}
      <Divider />
    </Box>
  );
}

export { CartItemComponent };
