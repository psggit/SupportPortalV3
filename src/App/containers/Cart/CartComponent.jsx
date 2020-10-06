import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import { OrderSummary } from "../Cart/components/orderSummary";

import { Button, Typography } from "@material-ui/core";

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
    backgroundColor: "#fff",
    marginTop: theme.spacing(4),
  },
  ListItemRoot: {
    width: "100%",
    fontSize: 16,
    color: "#606060",
  },
  ListItemRootTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
    textAlign: "right",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  buttonDiv: {
    textAlign: "right",
    justifyContent: "space-between",
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
  actionContainer: {
    padding: 0,
  },
  marginLeft: {
    marginLeft: "auto",
  },
}));

const CartComponent = (props) => {
  useEffect(() => {
    // console.log("CartComponent");
    // console.dir(props);
    console.log("cart-props", props)
  }, []);
  const classes = useStyles();
  const [modify, setModify] = useState(false);
  const handleModify = () => {
    setModify(!modify);
  };

  const handleCancel = () => {
    setModify(!modify);
  };

  const handleConfirm = () => {
    setModify(!modify);
  };

  return (
    <Card className={classes.CartComponent} variant="outlined">
      <CardContent p={2}>
        <Typography>
          <h4>CART DETAILS</h4>
        </Typography>
        <OrderSummary {...props} modify={modify} />
        {!modify && (
          <Box display="flex" flexDirection="row-reverse">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleModify}
            >
              Modify
            </Button>
          </Box>
        )}

        {modify && (
          <CardActions className={classes.actionContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCancel}
              className={classes.marginLeft}
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              size="small"
            >
              Confirm
            </Button>
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
};

CartComponent.propTypes = {
  fetchOrderDetails: PropTypes.func,
  orderInfo: PropTypes.object,
};

export { CartComponent };
