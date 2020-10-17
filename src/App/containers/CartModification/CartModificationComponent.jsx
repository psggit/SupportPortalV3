import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Button, Grid, List, LinearProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TopBar from "../../components/topBar";
import { CartItemComponent } from "./components/cartItem";

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
  newspaper: {
    height: 380,
    overflowY: "auto",
    padding: 20,
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
  let products = props.products;
  useEffect(() => {
    // console.log("cartModification orderData", props);
    //
    let payload = {
      city_id: 5,
      state_id: 4,
      retailer_id: 436,
      gps: "13.00712998686621,80.25632254779339",
    };
    props.setCart(products);
    props.fetchGenre(payload);
  }, []);

  useEffect(() => {
    if (props.fetchGenreSuccess) {
      let brandpayload = {
        city_id: 5,
        state_id: 4,
        retailer_id: 436,
        genre_id: props.genreData[0].id,
        gps: "13.00712998686621,80.25632254779339",
        offset: 0,
        limit: 20,
      };
      props.fetchBrand(brandpayload);
    }
  }, [props.fetchGenreSuccess]);

  const goBack = () => {
    history.push("/order-info/" + props.orderId);
  };

  const addItems = () => {
    //call fetch summary API
  };

  // console.log(props);

  const addItem = (event, value) => {
    // console.log("addItem", value);
    props.addSkuToCart(value);
  };

  const removeItem = (event, value) => {
    // console.log("remvoveItem", value);
    props.removeSkuFromCart(value);
  };

  const handleGenre = (event, genreId) => {
    let brandpayload = {
      city_id: 5,
      state_id: 4,
      retailer_id: 436,
      genre_id: genreId,
      gps: "13.00712998686621,80.25632254779339",
      offset: 0,
      limit: 20,
    };
    props.fetchBrand(brandpayload);
  };

  return (
    <Container component="main">
      <TopBar />
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
          <Grid item xs={11}>
            <p>RETAILER NAME: {props.retailer_name}</p>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid item xs={12}>
          {props.fetchGenreSuccess &&
            props.genreData.map((value) => {
              return (
                <Button
                  key={value.id}
                  onClick={(event) => handleGenre(event, value.id)}
                >
                  {value.name}
                </Button>
              );
            })}
        </Grid>
        {props.fetchBrandProgress && <LinearProgress />}
      </Box>
      <Box mt={4}>
        <List className={classes.newspaper}>
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
      </Box>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          className={classes.marginLeft}
          onClick={() => goBack()}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => addItems()}>
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
};

export { CartModificationComponent };
