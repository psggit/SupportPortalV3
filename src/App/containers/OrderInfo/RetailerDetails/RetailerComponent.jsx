import React, { useEffect, useState } from "react";
import RetailerDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "moment";
import PropTypes from "prop-types";
import Dialog from "../../../components/dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Card } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
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

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A");
};

const renderRetailerDetails = (props) => {
  const retailerDetails = props.orderInfo;
  return (
    <React.Fragment>
      <div>
        <div className="title">Retailer ID</div>
        <div className="value">
          {retailerDetails.retailer_id ? `${retailerDetails.retailer_id}` : "-"}
        </div>
      </div>
      <div>
        <div className="title">Retailer Name</div>
        <div className="value">
          {retailerDetails.retailer_name
            ? `${retailerDetails.retailer_name}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div className="value">
          {retailerDetails.retailer_contact_number
            ? `${retailerDetails.retailer_contact_number}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">City</div>
        <div className="value">
          {retailerDetails.retailer_city
            ? `${retailerDetails.retailer_city}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Locality</div>
        <div className="value">
          {retailerDetails.retailer_locality
            ? `${retailerDetails.retailer_locality}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Retailer Limit</div>
        <div className="value">
          {retailerDetails.retailer_limit
            ? `${retailerDetails.retailer_limit}`
            : "-"}
        </div>
      </div>
      <div>
        <div className="title">Store Address</div>
        <div className="value">
          {retailerDetails.retailer_address
            ? `${retailerDetails.retailer_address}`
            : "-"}
        </div>
      </div>
    </React.Fragment>
  );
};

const RetailerDetails = (props) => {
  console.log("[RetailerDetails]");
  // const orderId = props.orderInfo.order_id;

  useEffect(() => {
    props.fetchRetailerNotes(props.orderInfo.order_id);
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
      Change Retailer
    </Button>,
    // eslint-disable-next-line react/jsx-key
    <Button variant="contained" color="primary">
      Call
    </Button>,
  ];

  const retailerNotesAction = [
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
    console.log(props.retailerNotes);
  }

  return (
    <div className={classes.container}>
      <RetailerDetailsCard
        title="Retailer Details"
        actions={retailerDetailsAction}
      >
        {renderRetailerDetails(props)}
      </RetailerDetailsCard>
      <Card className={classes.card} variant="outlined">
        {props.fetchSuccess && (
          <ActivityItem
            arr={props.retailerNotes.orderNotes}
            keysToRender={keysToRenderInNotesCard}
          />
        )}
        {props.fetchProgress && <CircularProgress />}
      </Card>
    </div>
  );
};

RetailerDetails.propTypes = {
  fetchRetailerNotes: PropTypes.func,
  orderInfo: PropTypes.object,
  retailerNotes: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
};

export { RetailerDetails };
