import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "24px 0 24px 24px",
    "& .MuiStepContent-root": {
      marginLeft: 7,
      marginTop: -4,
      borderLeft: "1.6px solid #C7C7C7",
      paddingLeft: 16,
      '& p': {
        padding: "16px 0 10px 0",
        fontSize: 12,
        color: "#757575"
      }
    },
    "& .MuiStepConnector-vertical": {
      padding: 0,
      marginLeft: 7,
      borderLeft: "0.8px solid #C7C7C7"
    },
    '& .MuiStepConnector-lineVertical': {
      minHeight: 60
    },
    '& .MuiStepper-root': {
      padding: 0,
    },
    '& .MuiStep-root': {
      marginTop: -4,
    },
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: "#010B13",
      fontSize: 16
    }
  },
  progressLine: {
    height: 25,
    borderLeft: "1.6px solid #C7C7C7",
    margin: "20px 0 0 7px"
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 24
  }
}));

const useQontoStepIconStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: "2.4px solid #02B133"
  }
});

const QontoStepIcon =(props) => {
  const classes = useQontoStepIconStyles();

  return (
    <div className={classes.root}>
      <div className={classes.circle} />
    </div>
  );
}

const RenderStepper = (props) => {
  return (
    <Stepper orientation="vertical" >
      {
        props.steps.map((item, index) => (
          <Step key={`${item.order_status}${index}`} active={true}>
            <StepLabel StepIconComponent={QontoStepIcon}>{item.order_status}</StepLabel>
            <StepContent>
              <Typography>{Moment(item.time).format("D MMM hh:mm A")}</Typography>
              <Typography>{item.message}</Typography>
            </StepContent>
          </Step>
        ))
      }
    </Stepper>
  )
}

const OrderStatus = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text}>ORDER STATUS</Typography>
      <Typography className={classes.text}>ETA:_</Typography>
      {
        props.orderInfo.length > 0 &&
        <>
          <div className={classes.progressLine}></div>
          <RenderStepper steps={props.orderInfo} />
        </>
      }
      
    </Paper>
  )
}

OrderStatus.propTypes = {
  orderInfo: PropTypes.array,
}

export {OrderStatus};