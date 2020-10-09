import React, { useEffect, useState } from "react";
import DeliveryAgentDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "../../../components/dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid, CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";

const useStyles = makeStyles(() => ({
  formRoot: {
    padding: 24,
  },
  card: {
    width: 520,
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10,
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060",
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  ListItemRoot: {
    width: "100%",
    borderBottom: "1px solid #E5E5E5",
    fontSize: 16,
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
  },
}));

const renderRetailerDetails = (props) => {
  const retailerDetails = props.orderInfo;
  return (
    <React.Fragment>
      <div>
        <div className="title">Agent ID</div>
        <div className="value">
          {retailerDetails.delivery_agent_id ? `${retailerDetails.delivery_agent_id}` : "-"}
        </div>
      </div>
      <div>
        <div className="title">Agent Name</div>
        <div className="value">
          {retailerDetails.delivery_agent_name
            ? `${retailerDetails.delivery_agent_name}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div className="value">
          {retailerDetails.delivery_agent_contact_number
            ? `${retailerDetails.delivery_agent_contact_number}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">City</div>
        <div className="value">
          {retailerDetails.delivery_agnet_city_name
            ? `${retailerDetails.delivery_agnet_city_name}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Locality</div>
        <div className="value">
          {retailerDetails.delivery_agent_locality_name
            ? `${retailerDetails.delivery_agent_locality_name}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Agent Limit</div>
        <div className="value">
          {retailerDetails.delivery_agent_limit
            ? `${retailerDetails.delivery_agent_limit}`
            : "-"}
        </div>
      </div>
    </React.Fragment>
  );
};

const DeliveryAgentComponent = (props) => {
  console.log("[DeliveryAgentComponent]");
  // const orderId = props.orderInfo.order_id;

  useEffect(() => {
    props.fetchDeliveryAgentNotes(props.orderInfo.order_id);
  }, []);

  const classes = useStyles();

  console.log("useEffect", props);

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  const retailerDetailsAction = [
    // eslint-disable-next-line react/jsx-key
    <Button variant="outlined" color="primary">
      Unassign
    </Button>,
  ];

  const deliveryNotesAction = [
    // eslint-disable-next-line react/jsx-key
    <div>
      <Button variant="contained" color="primary" onClick={mountAddNote}>
        Add
      </Button>
      ,
      {showAddNoteDilog && (
        <Dialog
          title="ADD NOTE"
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Button
              variant="contained"
              buttonStyle="secondary"
              onClick={UnmountAddNote}
            >
              Cancel
            </Button>,
            // eslint-disable-next-line react/jsx-key
            <Button
              variant="contained"

              //onClick={commentUnmountModel}
            >
              Save
            </Button>,
          ]}
        >
          <form>
            <div className={classes.selectIssue}>
              <div>Select Issue</div>
              <div>
                <FormControl className={classes.formControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={classes.formRoot}>
              <TextareaAutosize
                className={classes.formControlTextarea}
                aria-label="minimum height"
                rowsMin={7}
                //onChange={handleCommentChange}
                placeholder="Add note here"
              />
            </div>
          </form>
        </Dialog>
      )}
    </div>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.fetchSuccess) {
    console.log("[RetailerComponent]");
    console.log(props.deliveryAgentNotes);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
      <DeliveryAgentDetailsCard
        title="DELIVERY AGENT DETAILS"
        actions={retailerDetailsAction}
      >
        {renderRetailerDetails(props)}
      </DeliveryAgentDetailsCard>
      </Grid>
      <Grid item xs={6}>
      <>
        {props.fetchSuccess && (
          <ActivityItem
            arr={props.deliveryAgentNotes.orderNotes}
            keysToRender={keysToRenderInNotesCard}
            issueType={"delivery_agent"}
            click={props.openDialog}
          />
        )}
        {props.fetchProgress && <CircularProgress />}
      </>
      </Grid>
    </Grid>
  );
};

DeliveryAgentComponent.propTypes = {
  fetchDeliveryAgentNotes: PropTypes.func,
  deliveryAgentNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
};

export { DeliveryAgentComponent };
