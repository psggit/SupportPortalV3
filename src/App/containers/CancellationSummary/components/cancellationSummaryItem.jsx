import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Collapse from "@material-ui/core/Collapse";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: theme.typography.fontFamily,
  },
  boxContainer: {
    margin: "0 auto",
    marginTop: "40px",
    fontFamily: theme.typography.fontFamily,
  },
  CartComponent: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItems: {
    color: "#010B13",
  },
  ListItemRoot: {
    width: "100%",
  },
  ListItemRootTitle: {
    width: "auto",
    fontSize: 16,
    fontWeight: "bold",
    flex: "none",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
  },
  ListItemTextLabel: {
    width: "60%",
  },
  ListItemTextValue: {
    width: "40%",
    textAlign: "right",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  addComponentLeft: {
    border: "1px solid",
    borderRadius: "50% 0 0 50%",
    borderRight: "none",
    "& button": {
      padding: "3px 0 3px 5px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  addComponentCenter: {
    border: "1px solid",
    borderRight: "none",
    borderLeft: "none",
    "& p": {
      width: "22px",
      height: "22px",
      display: "block",
      lineHeight: "22px",
      textAlign: "center",
    },
  },
  addComponentRight: {
    border: "1px solid",
    borderRadius: "0 50% 50% 0",
    borderLeft: "none",
    "& button": {
      padding: "3px 5px 3px 0",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1rem",
    },
  },
  listItemTextHead: {
    fontWeight: 600,
    color: "#010B13",
    fontSize: 14,
    marginRight: 5,
  },
}));

const CancellationSummaryItem = (props) => {
  const title = props.title;
  const value = props.value;
  const classes = useStyles();
  const type = props.type;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  if (type == "button") {
    return (
      <>
        <ListItem
          classes={{ root: classes.ListItemRoot }}
          dense
          disableGutters
          button={true}
          onClick={handleClick}
        >
          <ListItemText
            primary={title}
            className={classes.ListItemRootTitle}
            classes={{ primary: classes.listItemTextHead }}
          />
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          {value !== "" ? (
            <ListItemText
              primary={value}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextValue }}
            />
          ) : null}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List classes={{ root: classes.ListItemRoot }} dense disableGutters>
            {props.children}
          </List>
        </Collapse>
      </>
    );
  }
  return (
    <ListItem classes={{ root: classes.ListItemRoot }} dense disableGutters>
      <ListItemText
        primary={title}
        className={classes.ListItemTextRoot}
        classes={{ root: classes.ListItemTextLabel }}
      />
      <ListItemText
        primary={value}
        className={classes.ListItemTextRoot}
        classes={{ root: classes.ListItemTextValue }}
      />
    </ListItem>
  );
};

CancellationSummaryItem.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  children: PropTypes.any,
};

export { CancellationSummaryItem };
