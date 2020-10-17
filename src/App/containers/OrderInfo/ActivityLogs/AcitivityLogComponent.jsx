import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ActivityItem from "../../../components/activityItems";

const ActivityLogComponent = (props) => {
  useEffect(() => {
    const reqBody = { order_id: props.orderId, limit: 5, offset: 0 };
    props.fetchLogData(reqBody);
  }, []);

  if (props.fetchLogSuccess) {
    return (
      <ActivityItem
        arr={props.activityData.activity_details.activity}
        keysToRender={["notes", "created_at"]}
        title={"ACTIVITY LOGS"}
      />
    );
  } else {
    return <p>Fetching data</p>;
  }
};

ActivityLogComponent.propTypes = {
  orderId: PropTypes.string,
  activityData: PropTypes.any,
  fetchLogData: PropTypes.func,
  fetchLogSuccess: PropTypes.bool,
};

export { ActivityLogComponent };
