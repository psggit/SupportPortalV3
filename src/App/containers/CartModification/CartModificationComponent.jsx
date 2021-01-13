import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import uuid from "react-uuid";
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
  Divider,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TopBar from "../../components/topBar";
import { CartItemComponent } from "./components/cartItem";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";

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
    padding: 20,
  },
  ListItemRoot: {
    display: "flex",
    justifyContent: "space-between",
  },
  ListItem: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #C7C7C7",
  },
  ListItemName: {
    width: "auto",
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

const generateSKU = (cartItem) => {
  // let updatedSKU = { ...cartItem.sku[0], brand_name: cartItem.brand_name };
  let updatedSKU = [];
  cartItem.sku.map((value, index) => {
    updatedSKU[index] = {
      ...cartItem.sku[index],
      brand_name: cartItem.brand_name,
    };
    //
  });
  return updatedSKU;
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const CartModificationComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const boxRef = useRef(null);
  const [currentlyChecked, setCurrentlyChecked] = useState("");
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState({ right: false });
  const [searchQueryText, setSearchQueryText] = useState("");
  const [searchList, setSearchList] = useState("brand");
  const orderId = history.location.state.orderId;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let anchor = "right";
  useEffect(() => {
    console.log(history.location.state.previousCart);
    let products =
      history.location.state.previousCart !== null
        ? history.location.state.previousCart
        : history.location.state.products;
    let payload = {
      city_id: history.location.state.city_id,
      state_id: history.location.state.state_id,
      retailer_id: parseInt(history.location.state.retailerId),
      gps: history.location.state.gps,
    };
    props.setCart(products);
    props.fetchGenre(payload);
    return () => {
      props.resetOnUnmount();
    };
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
    history.push("/order-info/" + orderId);
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
      order_id: props.order_id,
      is_hw_enabled: false,
      is_gw_enabled: false,
      items: cartItem,
    };

    sessionStorage.setItem("modifiedCart", JSON.stringify(props.cartProducts));
    sessionStorage.setItem("modifyCartInfo", JSON.stringify(payload));
    sessionStorage.setItem("mode", "cartModified");
    history.push({
      pathname: "/order-info/" + history.location.state.orderId,
      state: {
        mode: "cartModified",
      },
    });
  };

  const addItem = (event, value) => {
    props.addSkuToCart(value);
  };
  const removeItem = (event, value) => {
    props.removeSkuFromCart(value);
  };

  const handleGenre = (event, genreId) => {
    setCurrentlyChecked(genreId);
    setSearchList("brand");
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

  const handleClick = () => {
    //load more items
    if (searchList === "brand") {
      let brandpayload = {
        city_id: history.location.state.city_id,
        state_id: history.location.state.state_id,
        retailer_id: parseInt(history.location.state.retailerId),
        gps: history.location.state.gps,
        genre_id: currentlyChecked,
        offset: offset + limit,
        limit: limit,
      };
      // setSearchList("brand");
      setOffset(offset + limit);
      props.fetchBrandPagination(brandpayload);
    } else {
      let queryPayload = {
        city_id: history.location.state.city_id,
        state_id: history.location.state.state_id,
        retailer_id: parseInt(history.location.state.retailerId),
        gps: history.location.state.gps,
        query: searchQueryText,
        offset: 0,
        limit: offset + limit,
      };
      // console.log("offset: ", offset, "limit: ", limit);
      setOffset(offset + limit);
      setCurrentlyChecked("");
      setSearchQueryText(searchQueryText);
      // setSearchList("query");
      props.searchItems(queryPayload);
    }
  };

  const searchQuery = (value) => {
    let queryPayload = {
      city_id: history.location.state.city_id,
      state_id: history.location.state.state_id,
      retailer_id: parseInt(history.location.state.retailerId),
      gps: history.location.state.gps,
      query: value,
      offset: 0,
      limit: limit,
    };
    setOffset(0);
    setSearchQueryText(value);
    setSearchList("query");
    setCurrentlyChecked("");
    props.searchItems(queryPayload);
  };

  let disableAddBtn = false;
  if (props.fetchGenreSuccess) {
    disableAddBtn = Object.keys(props.cartProducts).length == 0 ? true : false;
  }

  var productName;
  var productCount;
  if (props.fetchGenreSuccess) {
    productName = Object.keys(props.cartProducts).map(
      (value) => props.cartProducts[value].brand_name
    );
    productCount = Object.keys(props.cartProducts).map(
      (value) => props.cartProducts[value].ordered_count
    );
  }

  if (props.searchSuccess) {
    // console.log(props.brandData);
  }
  // console.log("prod", props.cartProducts.map((value) => props.cartProducts[value].brand_name));
  return (
    <Container component="main">
      <TopBar />
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <Box className={classes.list}>
          <Typography>Cart Products</Typography>
          <List>
            <div className={classes.ListItemRoot}>
              <ListItem className={classes.ListItemName} disableGutters>
                Item
              </ListItem>
              <ListItem className={classes.ListItemName} disableGutters>
                Qty
              </ListItem>
            </div>
            <Divider />
            {props.fetchGenreSuccess &&
              props.modifySuccess &&
              Object.keys(props.cartProducts).map((value) => {
                return (
                  <div key={uuid()} className={classes.ListItem}>
                    <ListItem className={classes.ListItemName} disableGutters>
                      {props.cartProducts[value].brand_name}
                    </ListItem>
                    <ListItem className={classes.ListItemName} disableGutters>
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
          <Grid item xs={7}>
            <Typography>
              RETAILER NAME: {history.location.state.retailer_name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Search items"
                  onChange={(event) => searchQuery(event.target.value)}
                  autoComplete="off"
                />
              </Grid>
            </Grid>
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
                key={uuid()}
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
      {props.searchProgress && <LinearProgress />}
      <Box className={classes.cartItemContainer} ref={boxRef}>
        <List className={classes.masonry}>
          {props.fetchBrandSuccess &&
            Object.entries(props.brandData).map((k) => {
              let updatedSku = generateSKU(k[1]);
              k[1] = {
                ...k[1],
                sku: [...updatedSku],
              };
              return (
                <CartItemComponent
                  key={uuid()}
                  product={k[1]}
                  addItem={addItem}
                  removeItem={removeItem}
                  cartProducts={props.cartProducts}
                  productName={productName}
                  productCount={productCount}
                />
              );
            })}
        </List>
        {props.fetchBrandSuccess && props.brandData.length > 0 && (
          <Button onClick={handleClick} fullWidth>
            Load more
          </Button>
        )}
        {props.fetchBrandSuccess && props.brandData.length == 0 && (
          <Typography variant="body2" align="center">
            Search for items using <b>Search Bar</b> on top right corner or
            click on <b>Genres</b>.
          </Typography>
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
  searchProgress: PropTypes.bool,
  searchSuccess: PropTypes.bool,
  modifySuccess: PropTypes.bool,
  genreData: PropTypes.array,
  brandData: PropTypes.array,
  products: PropTypes.array,
  cartProducts: PropTypes.object,
  fetchBrandPagination: PropTypes.func,
  searchItems: PropTypes.func,
  resetOnUnmount: PropTypes.func,
  fetchSummary: PropTypes.func,
};

export { CartModificationComponent };
