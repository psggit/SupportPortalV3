import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import RetailerDetailsCard from "../../../components/card";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";

const useStyles = makeStyles((theme) => ({
  formRoot: {
    padding: 24,
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

  const retailerDetailsAction = [
    <Button variant="outlined" color="primary" key="changeRetailer">
      Change Retailer
    </Button>,
    <Button variant="contained" color="primary" key="callBtn">
      Call
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.fetchSuccess) {
    console.log("[RetailerComponent]");
    console.log(props.retailerNotes);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <RetailerDetailsCard
          title="Retailer Details"
          actions={retailerDetailsAction}
        >
          {renderRetailerDetails(props)}
        </RetailerDetailsCard>
      </Grid>
      <Grid item xs={6}>
        <>
          {props.fetchSuccess && (
            <ActivityItem
              arr={props.retailerNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              issueType={"retalier"}
              click={props.openDialog}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
    </Grid>
  );
};

RetailerDetails.propTypes = {
  fetchRetailerNotes: PropTypes.func,
  orderInfo: PropTypes.object,
  retailerNotes: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
};

export { RetailerDetails };
