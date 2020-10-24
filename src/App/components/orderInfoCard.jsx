import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Moment from "moment";

import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    padding: 24,
    "& .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
  cardHeader: {
    "& .MuiCardHeader-content": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      "& > span": {
        fontSize: 16,
        fontWeight: 600,
        textTransform: "uppercase",
        padding: 0,
      },
      "& .MuiCardHeader-subheader": {
        "& .MuiCardActions-root": {
          padding: 0,
        },
      },
    },
  },
  cardContent: {
    "& > div": {
      fontSize: 16,
      color: "#606060",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "12px 0",
      "& .title": {
        width: "30%",
      },
      "& .value": {
        width: "70%",
      },
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  ListCustomerItem: {
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
  },
}));

CustomCard.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any,
  renderArray: PropTypes.array,
  keysToRender: PropTypes.array,
  keyMap: PropTypes.object,
  id: PropTypes.string,
  subheader: PropTypes.any,
};

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("DD/MM/YYYY");
};

export default function CustomCard(props) {
  const {
    title,
    actions,
    renderArray,
    keyMap,
    keysToRender,
    subheader,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subheader={
          subheader ? (
            <CardActions>
              {subheader.map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
            </CardActions>
          ) : (
            ""
          )
        }
      />
      <CardContent className={classes.cardContent}>
        <List>
          {renderArray.map((item, index) => {
            return (
              <ListItem
                key={index}
                classes={{ root: classes.ListCustomerItem }}
                disableGutters={true}
              >
                <ListItemText
                  primary={keyMap[keysToRender[index]]}
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
                <ListItemText
                  // primary={
                  //   item[keysToRender[index]] ? item[keysToRender[index]] : "-"
                  // }
                  primary={
                    Date.parse(item[keysToRender[index]])
                      ? getTimestamp(item[keysToRender[index]])
                      : item[keysToRender[index]] === item[keysToRender[5]]
                      ? getTimestamp(item[keysToRender[index]])
                      : item[keysToRender[index]]
                      ? item[keysToRender[index]]
                      : "-"
                  }
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      {actions ? (
        <CardActions className={classes.cardActions}>
          {actions.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}
