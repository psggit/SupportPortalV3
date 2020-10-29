import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useHistory } from "react-router-dom";
import { Box, Grid, Tab } from "@material-ui/core";

FullWidthTabs.propTypes = {
  labels: PropTypes.array,
  orderId: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    width: "100%",
    cursor: "pointer",
    color: theme.palette.primary.main,
    height: 64,
  },
}));

export default function FullWidthTabs(props) {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const goBack = () => {
    history.push("/order-info/" + props.orderId);
  };

  console.log(props);

  const handleGiftSoaChange = () => {
    history.push("/gift-soa");
    // history.push({
    //   pathname: "/gift-soa",
    //   state: {
    //     customerId: props.customerId,
    //   },
    // });
  };

  const handleRewardChange = () => {
    history.push("/rewards");
    // history.push({
    //   pathname: "/gift-soa",
    //   state: {
    //     customerId: props.customerId,
    //   },
    // });
  };

  const handleSoaChange = () => {
    history.push("/soa");
    // history.push({
    //   pathname: "/gift-soa",
    //   state: {
    //     customerId: props.customerId,
    //   },
    // });
  };

  const handleNotesChange = () => {
    history.push("/notes");
    // history.push({
    //   pathname: "/gift-soa",
    //   state: {
    //     customerId: props.customerId,
    //   },
    // });
  };

  const handleCustomerDetails = () => {
    history.push("/customer-detail");
    // history.push({
    //   pathname: "/gift-soa",
    //   state: {
    //     customerId: props.customerId,
    //   },
    // });
  };

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Grid alignItems="center" className={classes.root} container>
          <Grid item xs={1}>
            <Box textAlign="center">
              <Button
                color="primary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={() => goBack()}
              >
                Back
              </Button>
            </Box>
          </Grid>
          <Grid item xs={11}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab
                label="Customer Details"
                key="customerBtn"
                onClick={handleCustomerDetails}
              />
              <Tab label="SOA" key="soaBtn" onClick={handleSoaChange} />,
              <Tab
                label="Gift SOA"
                key="giftBtn"
                onClick={handleGiftSoaChange}
              />
              <Tab
                label="Rewards"
                key="rewardsBtn"
                onClick={handleRewardChange}
              />
              <Tab label="Notes" key="notesBtn" onClick={handleNotesChange} />
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
}
