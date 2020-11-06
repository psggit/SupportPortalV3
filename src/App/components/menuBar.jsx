import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";

FullWidthTabs.propTypes = {
  labels: PropTypes.array,
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    cursor: "pointer",
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const labels = props.labels;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // console.log("menuBars", props.labels);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {labels ? <div>{labels.map((item) => item)}</div> : ""}
        </Tabs>
      </AppBar>
    </div>
  );
}
