import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: 24,
    height: "fit-content",
    width: 520,
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
        fontWeight: "bold",
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
      padding: "12px 0",
      "& .title": {
        width: "30%",
      },
      "& .subtitle": { border: "3px solid" },
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

export default function CustomCard(props) {
  const { title, actions, children, subtitle } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.cardHeader}
        title={title}
        subtitle={subtitle}
      />
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
