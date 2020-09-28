import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TopBar from "../../components/topBar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { sizing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import { userAuthAPI } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
  },
  buttonDiv: {
    textAlign: "right",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  heading: {
    fontSize: "16px",
    lineHeight: "22px",
  },
}));

const DashboardContainer = () => {
  useEffect(() => {
    console.log("DashboardContainer");
    userAuthAPI(null, onProcess, onSuccess, onError);
  }, []);

  const classes = useStyles();

  const onProcess = (res) => {
    console.log("onProcess");
    console.log(res);
  };

  const onSuccess = (data) => {
    console.log("onSuccess");
    console.log(data);
  };

  const onError = (err) => {
    console.log("onError");
    console.log(err);
  };

  return (
    <Container component="main">
      <TopBar />
      <Box maxWidth="75%" alignItems="center">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Box boxShadow={0} pt={4} mt={2} className={classes.card}>
              <Typography variant="h5" className={classes.heading} gutterBottom>
                CUSTOMER DETAILS
              </Typography>
              <TextField
                id="standard-basic"
                label="Mobile Number"
                fullWidth
                margin="normal"
                placeholder="Enter Mobile Number"
              />
              <TextField
                id="standard-basic"
                label="Order ID"
                fullWidth
                margin="normal"
                placeholder="Enter Order ID"
              />
              <TextField
                id="standard-basic"
                label="Customer ID"
                fullWidth
                margin="normal"
                placeholder="Enter Customer ID"
              />
              <Box component="div" className={classes.buttonDiv}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.marginRight}
                >
                  Reset
                </Button>
                <Button variant="contained" color="primary">
                  Fetch Details
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box boxShadow={0} pt={4} mt={2} className={classes.card}>
              <Typography variant="h5" className={classes.heading} gutterBottom>
                RETAILER DETAILS
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box boxShadow={0} pt={4} mt={2} className={classes.card}>
              <Typography variant="h5" className={classes.heading} gutterBottom>
                DELIVERY AGENT DETAILS
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export { DashboardContainer };
