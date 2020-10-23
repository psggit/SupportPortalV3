import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  ListItem,
  ListItemText,
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
  cardHeader: {
    "& .MuiCardHeader-content": {
      "& > span": {
        fontSize: 16,
        fontWeight: 600,
        textTransform: "uppercase",
      },
    },
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
    display: "flex",
    justifyContent: "space-between",
  },
  ListItems: {
    color: "#010B13",
  },
  ListItemRoot: {
    width: "100%",
    alignItems: "flex-start",
  },
  ListItemRootTitle: {
    width: "40%",
    fontSize: 12,
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
  },
  root: {
    fontFamily: theme.typography.fontFamily,
    padding: 24,
    alignSelf: "baseline",
    "& .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardContent-root": {
      padding: 0,
    },
  },
  addBtn: {
    padding: 0,
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 24,
  },
  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
  },
}));

ActivityItem.propTypes = {
  arr: PropTypes.array,
  keysToRender: PropTypes.array,
  click: PropTypes.any,
  issueType: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.array,
  cardActions: PropTypes.bool,
};

export default function ActivityItem(props) {
  const classes = useStyles();
  let mapArray = props.arr;
  if (mapArray && mapArray.length > 3) {
    mapArray = mapArray.slice(0, 3);
  }
  const keysToRender = props.keysToRender;
  const type = props.issueType;
  const subtitle = props.subtitle;
  const titleText = props.title;
  const cardActions = props.cardActions;

  if (mapArray === null) {
    return (
      <Card className={classes.root}>
        <Box className={classes.header}>
          <CardHeader title={titleText} className={classes.cardHeader} />
          {subtitle ? (
            <CardActions className={classes.addBtn}>
              {subtitle.map((item, ind) => (
                <div key={ind}>{item}</div>
              ))}
            </CardActions>
          ) : (
            ""
          )}
        </Box>
        <CardContent>
          <ListItem
            dense
            disableGutters={true}
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
        {cardActions && (
          <CardActions className={classes.cardActions}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.click(type)}
            >
              Add
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box className={classes.header}>
          <CardHeader title={titleText} className={classes.cardHeader} />
          {subtitle ? (
            <CardActions className={classes.addBtn}>
              {subtitle.map((item, ind) => (
                <div key={ind}>{item}</div>
              ))}
            </CardActions>
          ) : (
            ""
          )}
        </Box>
        {mapArray.map((value, index) => {
          let data = value;
          return (
            <ListItem
              dense
              disableGutters={true}
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
                    key={ind + "." + keyValue}
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
      {cardActions && (
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.click(type)}
          >
            Add
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
