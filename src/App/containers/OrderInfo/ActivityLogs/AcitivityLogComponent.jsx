import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import ActivityItem from "../../../components/activityItems";
import { Button } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ErrorMsg from "../../../components/errorMsg";

const ActivityLogComponent = (props) => {
  // const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    const reqBody = { order_id: props.orderId, limit: 3, offset: 0 };
    props.fetchLogData(reqBody);
  }, []);

  const handleChange = () => {
    history.push("/activity-list");
  };

  const subheadAction = [
    <Button
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleChange}
      key="moreBtn"
    >
      More
    </Button>,
  ];

  if (props.fetchLogSuccess) {
    let arr = [];
    if (props.activityData) {
      arr = props.activityData.activity_logs;
    }
    return (
      <ActivityItem
        arr={arr}
        keysToRender={["notes", "created_at"]}
        title={"ACTIVITY LOGS"}
        cardActions={false}
        subtitle={subheadAction}
      />
    );
  } else {
    if (props.fetchLogFailed) {
      <ErrorMsg show={true} message={"Something went wrong"} type="error" />;
    }
  }
  return <p>Fetching data</p>;
};

ActivityLogComponent.propTypes = {
  orderId: PropTypes.string,
  activityData: PropTypes.any,
  fetchLogData: PropTypes.func,
  fetchLogSuccess: PropTypes.bool,
  fetchLogFailed: PropTypes.bool,
};

export { ActivityLogComponent };
