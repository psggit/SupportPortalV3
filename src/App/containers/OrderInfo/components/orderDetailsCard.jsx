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
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
} from "@material-ui/core";

import ActivityItem from "../../../components/activityItems";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    ...props.order,
  };
  platform = platform === "hb" ? "Hipbar Web" : "Flipkart";
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
    setOpen(false);
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
                  primary={platform}
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
            disabled={!props.order.order_status_button}
          >
            Cancel Order
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleDeliver}
            disabled={!props.order.order_status_button}
          >
            Deliver Order
          </Button>
        </CardActions>
      </Card>
      <>
        {/* {props.notesSuccess && (
          <ActivityItem
            arr={props.customerNotes.orderNotes}
            keysToRender={keysToRenderInNotesCard}
            title={"Activity Details"}
            issueType={"customer"}
            click={props.openDialog}
          />
        )} */}
        {/* {props.notesProgress && <CircularProgress />} */}
      </>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "Do you want to cancel order? Select reason for cancelling order and click Confirm to proceed."
          }
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
          <Button
            onClick={handleCancel}
            color="primary"
            variant="outlined"
            size="small"
          >
            Confirm
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            size="small"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

OrderDetailsCard.propTypes = {
  order: PropTypes.object,
  platform: PropTypes.string,
  address: PropTypes.string,
  handleCancel: PropTypes.func,
  handleDeliver: PropTypes.func,
  cancelReasons: PropTypes.array,
};

export { OrderDetailsCard };
