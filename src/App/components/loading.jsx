import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, Box, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  dialogPopup: {
    textAlign: "center",
  },
}));

Loading.propTypes = {
  message: PropTypes.string,
};

export default function Loading(props) {
  const classes = useStyles();
  return (
    <Dialog className={classes.dialogPopup} open={true} maxWidth="sm">
      <DialogTitle id="simple-dialog-title">{props.message}</DialogTitle>
      <Box pb={3}>
        <CircularProgress color="primary" />
      </Box>
    </Dialog>
  );
}
