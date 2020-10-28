import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import {
  Button,
  Grid,
  List,
  LinearProgress,
  Drawer,
  ListItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TopBar from "../../components/topBar";
import { CartItemComponent } from "./components/cartItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

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
    color: "#696969",
  },
  cartItemContainer: {
    height: "55vh",
    overflowY: "auto",
  },
  masonry: {
    padding: 20,
    columnCount: 2,
    columnGap: "1em",
  },
  marginRight: {
    marginRight: 10,
  },
  active: {
    color: "#010B13",
  },
  list: {
    width: 250,
  },
  ListItemName: {
    width: "70%",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const CartModificationComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const boxRef = useRef(null);
  const [currentlyChecked, setCurrentlyChecked] = useState();
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState({ right: false });
  const [disableAddBtn, setDisabledAddBtn] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let products = history.location.state.products;
  useEffect(() => {
    console.log("cartModification orderData", props);
    //
    let payload = {
      city_id: history.location.state.city_id,
      state_id: history.location.state.state_id,
      retailer_id: parseInt(history.location.state.retailerId),
      gps: history.location.state.gps,
    };
    props.setCart(products);
    props.fetchGenre(payload);
  }, []);

  useEffect(() => {
    if (props.fetchGenreSuccess) {
      let brandpayload = {
        city_id: history.location.state.city_id,
        state_id: history.location.state.state_id,
        retailer_id: parseInt(history.location.state.retailerId),
        gps: history.location.state.gps,
        genre_id: props.genreData[0].id,
        offset: offset,
        limit: limit,
      };
      props.fetchBrand(brandpayload);
      setCurrentlyChecked(props.genreData[0].id);
      setOffset(0);
    }
  }, [props.fetchGenreSuccess]);

  const goBack = () => {
    history.push("/order-info/" + props.orderId);
  };

  const addItems = () => {
    //call fetch summary API
    let cartItem = [];

    Object.keys(props.cartProducts).forEach((value) => {
      cartItem.push({
        sku_id: parseInt(value),
        count: props.cartProducts[value].ordered_count,
      });
    });

    let payload = {
      order_id: props.orderId,
      is_hw_enabled: false,
      is_gw_enabled: false,
      items: cartItem,
    };
    history.push({
      pathname: "/order-info/" + history.location.state.orderId,
      state: {
        modifyCartInfo: payload,
      },
    });
  };

  const addItem = (event, value) => {
    // console.log(props.cartProducts);
    console.log(Object.entries(props.cartProducts).length);
    Object.entries(props.cartProducts).length == 1
      ? setDisabledAddBtn(true)
      : setDisabledAddBtn(false);
    props.addSkuToCart(value);
  };

  const removeItem = (event, value) => {
    console.log(Object.entries(props.cartProducts).length);
    Object.entries(props.cartProducts).length == 1
      ? setDisabledAddBtn(true)
      : setDisabledAddBtn(false);
    props.removeSkuFromCart(value);
  };

  const handleGenre = (event, genreId) => {
    setCurrentlyChecked(genreId);
    setOffset(0);
    let brandpayload = {
      city_id: history.location.state.city_id,
      state_id: history.location.state.state_id,
      retailer_id: parseInt(history.location.state.retailerId),
      gps: history.location.state.gps,
      genre_id: genreId,
      offset: 0,
      limit: limit,
    };
    props.fetchBrand(brandpayload);
  };

  const handleClick = (event) => {
    //load more items
    let brandpayload = {
      city_id: history.location.state.city_id,
      state_id: history.location.state.state_id,
      retailer_id: parseInt(history.location.state.retailerId),
      gps: history.location.state.gps,
      genre_id: currentlyChecked,
      offset: offset + limit,
      limit: limit,
    };
    setOffset(offset + limit);
    props.fetchBrandPagination(brandpayload);
  };

  console.log(props);
  let anchor = "right";

  return (
    <Container component="main">
      <TopBar />
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Box className={classes.list}>
          <p>Cart Products</p>
          <List>
            {props.fetchGenreSuccess &&
              Object.keys(props.cartProducts).map((value) => {
                return (
                  <div key={props.cartProducts[value]}>
                    <ListItem className={classes.ListItemName}>
                      {props.cartProducts[value].brand_name}
                    </ListItem>
                    <ListItem>
                      {props.cartProducts[value].ordered_count}
                    </ListItem>
                  </div>
                );
              })}
          </List>
        </Box>
      </Drawer>
      <Box className={classes.boxContainer}>
        <Grid alignItems="baseline" container>
          <Grid item xs={1}>
            <Button
              color="primary"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => goBack()}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={10}>
            <p>RETAILER NAME: {history.location.state.retailer_name}</p>
          </Grid>
          <Grid item xs={1}>
            <Button
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={toggleDrawer(anchor, true)}
            >
              Cart
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" alignItems="center" height={"60px"}>
        {props.fetchGenreSuccess &&
          props.genreData.map((value) => {
            return (
              <Button
                key={value.id}
                onClick={(event) => handleGenre(event, value.id)}
                className={
                  currentlyChecked == value.id ? classes.active : classes.btn
                }
              >
                {value.name}
              </Button>
            );
          })}
      </Box>
      {props.fetchBrandProgress && <LinearProgress />}
      <Box className={classes.cartItemContainer} ref={boxRef}>
        <List className={classes.masonry}>
          {props.fetchBrandSuccess &&
            Object.entries(props.brandData).map((k) => {
              return (
                <CartItemComponent
                  key={k[0]}
                  product={k[1]}
                  addItem={addItem}
                  removeItem={removeItem}
                  cartProducts={props.cartProducts}
                />
              );
            })}
        </List>
        {props.fetchBrandSuccess && (
          <Button onClick={handleClick} fullWidth>
            Load more
          </Button>
        )}
      </Box>
      <Box m={1} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginRight}
          onClick={() => goBack()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addItems()}
          disabled={disableAddBtn}
        >
          Add Items
        </Button>
      </Box>
    </Container>
  );
};

CartModificationComponent.propTypes = {
  fetchGenre: PropTypes.func,
  fetchBrand: PropTypes.func,
  addSkuToCart: PropTypes.func,
  removeSkuFromCart: PropTypes.func,
  setCart: PropTypes.func,
  orderId: PropTypes.any,
  orderData: PropTypes.object,
  retailer_name: PropTypes.string,
  fetchGenreSuccess: PropTypes.bool,
  fetchBrandSuccess: PropTypes.bool,
  fetchBrandProgress: PropTypes.bool,
  modifySuccess: PropTypes.bool,
  genreData: PropTypes.array,
  brandData: PropTypes.array,
  products: PropTypes.array,
  cartProducts: PropTypes.object,
  fetchBrandPagination: PropTypes.func,
};

export { CartModificationComponent };
