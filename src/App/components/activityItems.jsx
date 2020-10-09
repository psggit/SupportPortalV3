import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Moment from "moment";

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A");
};

const useStyles = makeStyles((theme) => ({
  rootCard: {
    fontFamily: theme.typography.fontFamily,
    padding: 24,
    width: 520,
    "& .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
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
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

ActivityItem.propTypes = {
  arr: PropTypes.array,
  keysToRender: PropTypes.array,
  actions: PropTypes.array,
  title: PropTypes.string,
};

export default function ActivityItem(props) {
  const classes = useStyles();
  const mapArray = props.arr;
  const title = props.title;
  const actions = props.actions;
  const keysToRender = props.keysToRender;
  console.log("[ActivityItem]", mapArray);
  console.log("[keysToRender]", keysToRender);

  return (
    <Card className={classes.rootCard}>
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          {title}
        </Typography>
        {mapArray.map((value, index) => {
          let data = value;
          return (
            <ListItem
              dense
              disableGutters
              className={classes.ListItemRow}
              classes={{ root: classes.ListItemRoot }}
              key={index}
            >
              {keysToRender.map((keyValue, ind) => {
                let primaryValue =
                  keyValue == "created_at"
                    ? getTimestamp(data[keyValue])
                    : data[keyValue];
                return (
                  <ListItemText
                    key={ind}
                    primary={primaryValue}
                    className={classes.ListItemTextRoot}
                    classes={{ root: classes.ListItemTextValue }}
                  />
                );
              })}
            </ListItem>
          );
        })}
      </CardContent>
      {actions ? (
        <CardActions className={classes.cardActions}>
          {actions.map((item) => item)}
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}
