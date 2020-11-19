import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ActivityItem from "../../../components/activityItems";
import { Button, CircularProgress } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import uuid from "react-uuid";

const ActivityLogComponent = (props) => {
  // const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    const reqBody = { order_id: props.orderId, limit: 3, offset: 0 };
    props.fetchLogData(reqBody);
  }, []);

  const handleChange = () => {
    history.push({
      pathname: "/activity-list",
      state: {
        orderId: props.orderId,
      },
    });
  };

  const subheadAction = [
    <Button
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleChange}
      key={uuid()}
    >
      More
    </Button>,
  ];

  if (props.fetchLogProgress) {
    return <CircularProgress />;
  }

  return (
    <ActivityItem
      arr={props.activityData ? props.activityData.activity_logs : []}
      keysToRender={["notes", "created_at"]}
      title={"ACTIVITY LOGS"}
      cardActions={false}
      subtitle={subheadAction}
      success={props.fetchLogSuccess}
      fail={props.fetchLogFailed}
      errorMsg={props.errorMsg}
    />
  );
};

ActivityLogComponent.propTypes = {
  orderId: PropTypes.string,
  activityData: PropTypes.any,
  fetchLogData: PropTypes.func,
  fetchLogSuccess: PropTypes.bool,
  fetchLogFailed: PropTypes.bool,
  fetchLogProgress: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export { ActivityLogComponent };
