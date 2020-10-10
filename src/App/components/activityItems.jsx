import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  CardHeader,
  Button,
  CardActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Moment from "moment";

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A");
};

const useStyles = makeStyles((theme) => ({
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
    color: "#606060",
    textAlign: "right",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
    color: "#606060",
    width: "70%",
    fontSize: 16,
  },
  ListItemRow: {
    borderBottom: "1px solid #E5E5E5",
    padding: "10px",
  },
  cardHeader: {
    "& .MuiCardHeader-content": {
      paddingBottom: 12,
      "& > span": {
        fontSize: 16,
        fontWeight: 600,
        textTransform: "uppercase",
      },
    },
  },
  root: {
    fontFamily: theme.typography.fontFamily,
    padding: 24,
    width: 520,
    alignSelf: "baseline",
    boxShadow: "none",
    "& .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

ActivityItem.propTypes = {
  arr: PropTypes.array,
  keysToRender: PropTypes.array,
  click: PropTypes.any,
  issueType: PropTypes.string,
};

export default function ActivityItem(props) {
  const classes = useStyles();
  let mapArray = props.arr;
  if (mapArray && mapArray.length > 3) {
    mapArray = mapArray.slice(0, 3);
  }
  console.log(props);
  const keysToRender = props.keysToRender;
  const type = props.issueType;
  console.log("[ActivityItem]", props);
  // console.log("[keysToRender]", keysToRender);
  if (mapArray === null) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <CardHeader
            className={classes.cardHeader}
            title={"ACTIVITY DETAILS"}
          />
          <ListItem
            dense
            disableGutters
            className={classes.ListItemRow}
            classes={{ root: classes.ListItemRoot }}
          >
            <ListItemText
              primary={"No data available"}
              className={classes.ListItemTextRoot}
              classes={{ root: classes.ListItemTextValue }}
            />
          </ListItem>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.click(type)}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          ACTIVITY DETAILS
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
                let listClass =
                  keyValue == "created_at"
                    ? classes.ListItemRootTitle
                    : classes.ListItemTextRoot;
                return (
                  <ListItemText
                    key={ind}
                    primary={primaryValue}
                    className={listClass}
                    classes={{ root: classes.ListItemTextValue }}
                  />
                );
              })}
            </ListItem>
          );
        })}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.click(type)}
        >
          Add
        </Button>
      </CardActions>
    </Card>
  );
}
