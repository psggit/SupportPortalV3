import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Snackbar, IconButton } from "@material-ui/core/";
import MuiAlert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

ErrorMsg.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.string,
};

export default function ErrorMsg(props) {
  const classes = useStyles();
  const { message, show, type } = props;
  const [open, setOpen] = useState(show);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
