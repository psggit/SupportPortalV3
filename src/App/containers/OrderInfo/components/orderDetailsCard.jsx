import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: theme.spacing(4),
  },
  actionContainer: {
    padding: theme.spacing(2),
  },
  marginLeft: {
    marginLeft: "auto",
  },
  heading: {
    fontSize: "16px",
    lineHeight: "22px",
  },
  ListItems: {
    color: "#010B13",
  },
  ListItemRoot: {
    width: "100%",
    alignItems: "flex-start",
  },
  ListItemRootTitle: {
    width: "30%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
    width: "70%",
    fontSize: 16,
  },
  ListItemRow: {
    borderBottom: "1px solid #E5E5E5",
  },
}));

const OrderDetailsCard = (props) => {
  const classes = useStyles();
  let { platform, customer_address } = {
    ...props.orderInfo,
  };
  platform == "hb" ? (platform = "Hipbar Web") : (platform = "Flipkart");
  useEffect(() => {
    // 
  }, []);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("female");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    //
    handleClickOpen();
  };

  const handleDeliver = () => {};
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" className={classes.heading} gutterBottom>
            ORDER DETAILS
          </Typography>
          <Box>
            <List dense disablePadding>
              <ListItem dense disableGutters>
                <ListItemText
                  primary="Platform"
                  className={classes.ListItemRootTitle}
                  classes={{ root: classes.ListItemRootTitle }}
                />
                <ListItemText
                  primary={props.platform}
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextRoot }}
                />
              </ListItem>
              <ListItem dense disableGutters className={classes.ListItemRoot}>
                <ListItemText
                  primary="Delivery Address"
                  className={classes.ListItemRootTitle}
                  classes={{ root: classes.ListItemRootTitle }}
                />
                <ListItemText
                  primary={customer_address}
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextRoot }}
                />
              </ListItem>
            </List>
          </Box>
        </CardContent>
        <CardActions className={classes.actionContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.marginLeft}
            size="small"
            onClick={handleCancel}
          >
            Cancel Order
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleDeliver}
          >
            Deliver Order
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography variant="h5" className={classes.heading} gutterBottom>
            ACTIVITY DETAILS
          </Typography>
          <ListItem
            dense
            disableGutters
            className={classes.ListItemRow}
            classes={{ root: classes.ListItemRoot }}
          >
            <ListItemText
              primary={customer_address}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
          <ListItem
            dense
            disableGutters
            className={classes.ListItemRow}
            classes={{ root: classes.ListItemRoot }}
          >
            <ListItemText
              primary={customer_address}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
          <ListItem
            dense
            disableGutters
            className={classes.ListItemRow}
            classes={{ root: classes.ListItemRoot }}
          >
            <ListItemText
              primary={customer_address}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextRoot }}
            />
          </ListItem>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            {props.cancelReasons.map((value) => {
              return (
                <FormControlLabel
                  key={value.id}
                  value={value.id}
                  control={<Radio />}
                  label={value.reason}
                />
              );
            })}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

OrderDetailsCard.propTypes = {
  orderInfo: PropTypes.object,
  platform: PropTypes.string,
  address: PropTypes.string,
  handleCancel: PropTypes.func,
  handleDeliver: PropTypes.func,
  cancelReasons: PropTypes.array,
};

export { OrderDetailsCard };
