import React, { useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  dialogBody: {
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    margin: "0 0 20px",
  },
  dialogTitle: {
    fontWeight: "600",
    marginBottom: 20,
    padding: 0,
    "& h2": {
      fontSize: 16,
      color: "#212121",
      fontWeight: 600,
    },
  },
  dialogContent: {
    padding: 0,
    width: "100%",
  },
  dialogFooter: {
    padding: 0,
    paddingTop: "24px",
  },
}));

const DialogComponent = (props) => {
  const classes = useStyles();
  let { title, subtitle, actions, issueDesc, change } = props;
  useEffect(() => {
    console.log("componentDidMount");

    return () => {
      console.log("componentWillUnmount");
      change("");
    };
  }, []);
  return (
    <Dialog
      open={true}
      key={0}
      // onClose={handleClose}
    >
      <div style={{ width: "492px", padding: "24px" }}>
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {subtitle && (
            <DialogContentText
              id="alert-dialog-description"
              className={classes.dialogBody}
            >
              {subtitle}
            </DialogContentText>
          )}
          <TextField
            id="outlined-textarea"
            placeholder="Add note here"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            value={issueDesc}
            fullWidth
            onChange={(event) => change(event.target.value)}
          />
        </DialogContent>
        <DialogActions className={classes.dialogFooter}>
          {actions.map((item) => item)}
        </DialogActions>
      </div>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any,
  issueDesc: PropTypes.string,
  change: PropTypes.any,
};

export default DialogComponent;
