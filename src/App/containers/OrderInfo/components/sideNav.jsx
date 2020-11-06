import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Box, Paper, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fixedSideBar: {
    height: "100%",
    position: "fixed",
    right: 0,
    top: 60,
    padding: 10,
    paddingTop: 20,
  },
  fabBtn: {
    marginTop: 150,
  },
  sideNavBtnO: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    height: 30,
    width: 30,
    minWidth: 30,
    fontSize: 18,
    lineHeight: "1em",
    margin: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnC: {
    backgroundColor: "#FB337A",
    color: "#fff",
    height: 30,
    width: 30,
    minWidth: 30,
    fontSize: 18,
    margin: 5,
    lineHeight: "1em",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#FB337A",
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnR: {
    backgroundColor: "#F4A60B",
    color: "#fff",
    height: 30,
    width: 30,
    minWidth: 30,
    fontSize: 18,
    margin: 5,
    lineHeight: "1em",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#F4A60B",
      textDecoration: "underline",
      color: "#fff",
    },
  },
  sideNavBtnD: {
    backgroundColor: "#1B4987",
    color: "#fff",
    height: 30,
    width: 30,
    minWidth: 30,
    fontSize: 18,
    margin: 5,
    lineHeight: "1em",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#1B4987",
      textDecoration: "underline",
      color: "#fff",
    },
  },
}));

SideNav.propTypes = {
  activeSection: PropTypes.string,
  handleAddIssue: PropTypes.any,
  handleScroll: PropTypes.any,
};
export default function SideNav(props) {
  const { handleAddIssue, activeSection, handleScroll } = props;
  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.fixedSideBar}>
      <Box display="flex" alignItems="flex-end" flexDirection="column">
        <Button
          title="Order Detail"
          className={activeSection === "section1" ? "active" : null}
          classes={{ root: classes.sideNavBtnO }}
          onClick={() => handleScroll("section1")}
        >
          O
        </Button>
        <Button
          title="Customer"
          className={activeSection === "section2" ? "active" : null}
          classes={{ root: classes.sideNavBtnC }}
          onClick={() => handleScroll("section2")}
        >
          C
        </Button>
        <Button
          title="Retailer"
          className={activeSection === "section3" ? "active" : null}
          classes={{ root: classes.sideNavBtnR }}
          onClick={() => handleScroll("section3")}
        >
          R
        </Button>
        <Button
          title="Delivery Agent"
          className={activeSection === "section4" ? "active" : null}
          classes={{ root: classes.sideNavBtnD }}
          onClick={() => handleScroll("section4")}
        >
          D
        </Button>
        <Box>
          <Fab
            size="small"
            color="primary"
            className={classes.fabBtn}
            aria-label="add"
            onClick={() => handleAddIssue()}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </Paper>
  );
}
