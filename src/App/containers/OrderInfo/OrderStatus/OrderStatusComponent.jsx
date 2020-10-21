import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Moment from "moment";
import PropTypes from "prop-types";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

const useStyles = makeStyles(() => ({
  root: {
    alignItems: "baseline",
    width: "100%",
    padding: 24,
    height: "100vh",
    overflowY: "auto",
    "& .MuiTimelineItem-missingOppositeContent:before": {
      padding: 0,
      flex: 0,
    },
    "& .MuiTimelineDot-root": {
      width: 16,
      height: 16,
      borderColor: "#02B133",
    },
  },
  text: {
    fontSize: 16,
    paddingBottom: 24,
  },
}));

const RenderTimeline = (props) => {
  return (
    <>
      {props.steps.map((item, index) => {
        return (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot variant="outlined" />
              {props.steps.length !== index + 1 ? <TimelineConnector /> : ""}
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{item.order_status}</Typography>
              <Typography variant="subtitle1">
                {Moment(item.time).format("D MMM hh:mm A")} <br />
                {item.message}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </>
  );
};

RenderTimeline.propTypes = {
  steps: PropTypes.array,
};

const OrderStatus = (props) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text} variant="h4">
        ORDER ID: {props.orderId}
      </Typography>
      <Typography className={classes.text} variant="body2">
        ETA: -
      </Typography>
      {props.orderInfo.length > 0 && (
        <>
          <Timeline>
            <RenderTimeline steps={props.orderInfo} />
          </Timeline>
        </>
      )}
    </Paper>
  );
};

OrderStatus.propTypes = {
  orderInfo: PropTypes.array,
  orderId: PropTypes.any,
  steps: PropTypes.array,
};

export { OrderStatus };
