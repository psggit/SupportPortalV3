import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    padding: 24,
    boxShadow: "none",
    "& .MuiCardHeader-root": {
      padding: 0,
    },
    "& .MuiCardContent-root": {
      padding: 0,
    },
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
}));
CustomCard.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.array,
  children: PropTypes.any,
};
export default function CustomCard(props) {
  const { title, actions, children } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title={title} />
      <CardContent className={classes.cardContent}>{children}</CardContent>
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
