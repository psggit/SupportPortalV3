import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
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
    fontWeight: 700,
    "& .MuiCardHeader-content": {
      paddingBottom: 12,
      "& > span": {
        fontSize: 16,
        fontWeight: 600,
        textTransform: "uppercase",
      },
    },
  },
  cardContent: {
    "& > .MuiBox-root": {
      fontSize: 16,
      color: "#606060",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& .title": {
        width: "30%",
      },
      "& .value": {
        width: "70%",
      },
      "& .subheader": {
        //width: "30%",
        color: "#0086AD",
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
  subheader: PropTypes.any,
  cardFooter: PropTypes.any,
};
export default function CustomCard(props) {
  const { title, actions, children, subheader, cardFooter } = props;
  //console.log("cardFooter ", cardFooter);
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
      <CardContent className={classes.cardContent}>{children}</CardContent>
      {actions ? (
        <CardActions className={classes.cardActions}>
          {actions.map((item, index) => {
            return <div key={index}>{item}</div>;
          })}
        </CardActions>
      ) : (
        ""
      )}
      {cardFooter !== undefined && <Box mt={2}>{cardFooter}</Box>}
    </Card>
  );
}
