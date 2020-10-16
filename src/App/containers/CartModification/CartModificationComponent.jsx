import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { Button, Grid, List } from "@material-ui/core";
// import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TopBar from "../../components/topBar";
import { Link } from "@material-ui/core";
// import { fetchGenre } from "./duck";
import { listGenre, listBrand } from "../../mockDataResponse";
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
    height: 400,
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const CartModificationComponent = (props) => {
  const classes = useStyles();
  // const [value, setValue] = useState(0);
  let products = props.products;

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    console.log("cartModification orderData", props);
    // let brandpayload = {"city_id":5,"state_id":4,"retailer_id":436,"genre_id":4,"gps":"13.00712998686621,80.25632254779339","offset":0,"limit":20}
    let payload = {
      city_id: 5,
      state_id: 4,
      retailer_id: 436,
      gps: "13.00712998686621,80.25632254779339",
    };
    props.setCart(products);
    props.fetchGenre(payload);
  }, []);

  console.log(props);

  const addItem = (event, value) => {
    console.log("addItem", value);
  };

  const removeItem = (event, value) => {
    console.log("remvoveItem", value);
  };

  return (
    <Container component="main">
      <TopBar />
      <Box className={classes.boxContainer}>
        <Grid alignItems="baseline" container>
          <Grid item xs={1}>
            <Link href={"/order-info/" + props.orderId}>
              <Button color="primary" startIcon={<KeyboardBackspaceIcon />}>
                Back
              </Button>
            </Link>
          </Grid>
          <Grid item xs={11}>
            <p>RETAILER NAME: {props.retailer_name}</p>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4}>
        <List className={classes.newspaper}>
          {props.modifySuccess &&
            Object.entries(listBrand.brands).map((k) => {
              return (
                <CartItemComponent
                  key={k[0]}
                  product={k[1]}
                  addItem={addItem}
                  removeItem={removeItem}
                />
              );
            })}
        </List>
      </Box>
    </Container>
  );
};

CartModificationComponent.propTypes = {
  fetchGenre: PropTypes.func,
  setCart: PropTypes.func,
  orderId: PropTypes.any,
  orderData: PropTypes.object,
  retailer_name: PropTypes.string,
  fetchGenreSuccess: PropTypes.bool,
  modifySuccess: PropTypes.bool,
  genreData: PropTypes.array,
  products: PropTypes.array,
};

export { CartModificationComponent };

{
  /* {<AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {props.fetchGenreSuccess &&
              props.genreData.map((value, index) => {
                return (
                  <Tab
                    label={value.name}
                    key={value.id}
                    {...a11yProps(index)}
                  />
                );
              })}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
        <TabPanel value={value} index={7}>
          Item Five
        </TabPanel>
        <TabPanel value={value} index={8}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={9}>
          Item Seven
        </TabPanel>
        <TabPanel value={value} index={10}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={11}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={12}>
          Item Five
        </TabPanel>} */
}
