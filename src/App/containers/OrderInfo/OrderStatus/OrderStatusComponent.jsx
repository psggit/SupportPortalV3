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
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "baseline",
    width: "100%",
    padding: "24px 0 24px 24px",
    height: "100vh",
    overflowY: "auto",

    '& .MuiTimelineItem-missingOppositeContent:before': {
      padding: 0,
      flex: 0
    },
    '& .MuiTimelineDot-root': {
      width: 16,
      height: 16,
      borderColor: "#02B133"
    }
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 24,
  },
}))

const RenderTimeline = (props) => {
  return (
  <>
      {
        props.steps.map((item, index) => {
          return (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined"  />
                {props.steps.length !== index + 1 ? <TimelineConnector /> : ''}
              </TimelineSeparator>
              <TimelineContent>
                {item.order_status}
                <Typography>{Moment(item.time).format("D MMM hh:mm A")}</Typography>
                <Typography>{item.message}</Typography>
              </TimelineContent>
            </TimelineItem>
          )
        })
      }
    </>
  )
}

const OrderStatus = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text}>
        ORDER STATUS: {props.orderId}
      </Typography>
      <Typography className={classes.text}>ETA: -</Typography>
      {props.orderInfo.length > 0 && (
        <>
          <Timeline className={classes.root}>
            <RenderTimeline steps={props.orderInfo} />
          </Timeline>  
        </>
        )
      }
    </Paper>
  );
};

OrderStatus.propTypes = {
  orderInfo: PropTypes.array,
  orderId: PropTypes.any,
};

export { OrderStatus };
