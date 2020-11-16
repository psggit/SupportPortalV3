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
// import { sendIcon } from "../../../assets/images";

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
    // "& .MuiTypography-body1": {
    //   fontWeight: "bolder",
    // },
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

  // const handleChange = () => {
  //   // history.push("/order-tracking/"+props.orderId);
  //   console.log("handlechange", props);
  //   let {
  //     customer_name,
  //     customer_contact_number,
  //     delivery_agent_name,
  //     delivery_agent_contact_number,
  //     retailer_name,
  //     retailer_contact_number,
  //   } = props.orderInfo;
  //   history.push({
  //     pathname: "/order-tracking",
  //     state: {
  //       orderId: props.orderId,
  //       orderInfo: {
  //         customer_name: customer_name,
  //         customer_contact_number: customer_contact_number,
  //         delivery_agent_name: delivery_agent_name,
  //         delivery_agent_contact_number: delivery_agent_contact_number,
  //         retailer_name: retailer_name,
  //         retailer_contact_number: retailer_contact_number,
  //       },
  //     },
  //   });
  // };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.text} variant="h4">
        ORDER ID: {props.orderId}
      </Typography>
      {/*<Typography className={classes.text} variant="body2">
        ETA: -
      </Typography>
       <Box textAlign="center">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={
            <SvgIcon>
              {
                <path
                  d="M18.1109 5.81839L16.4706 6.49774L2.15164 12.3314L0.543684 12.9773L2.11876 13.6901L7.70314 16.2261L10.2386 21.811L10.9514 23.3861L11.5974 21.7781L17.431 7.45923L18.1109 5.81839ZM15.4099 8.51936L10.8856 19.607L8.94676 15.3474L8.83062 15.0986L8.5819 14.9825L4.32229 13.0436L15.4099 8.51936Z"
                  fill="#0086AD"
                />
              }
            </SvgIcon>
          }
          onClick={() => handleChange()}
        >
          Track Order
        </Button>
      </Box> */}
      {props.timingDetails.length > 0 && (
        <>
          <Timeline>
            <RenderTimeline steps={props.timingDetails} />
          </Timeline>
        </>
      )}
    </Paper>
  );
};

OrderStatus.propTypes = {
  orderInfo: PropTypes.object,
  timingDetails: PropTypes.array,
  orderId: PropTypes.any,
  steps: PropTypes.array,
};

export { OrderStatus };
