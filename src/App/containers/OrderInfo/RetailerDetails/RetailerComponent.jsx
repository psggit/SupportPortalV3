import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

const keysToRender = [
  "retailer_id",
  "retailer_name",
  "retailer_contact_number",
  "retailer_city",
  "retailer_locality",
  "retailer_limit",
  "retailer_address",
];
const keyMap = {
  retailer_id: "Retailer ID",
  retailer_name: "Retailer Name",
  retailer_contact_number: "Mobile Number",
  retailer_city: "City",
  retailer_locality: "Locality",
  retailer_limit: "Retailer Limit",
  retailer_address: "Store Address",
};

const RetailerComponent = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const actionButtons = [
    <Button variant="outlined" color="primary" key="unassignBtn">
      Unassign
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DetailsCard
          title="RETAILER DETAILS"
          actions={actionButtons}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
        />
      </Grid>
      <Grid item xs={6}>
        <>
          {props.fetchSuccess && (
            <ActivityItem
              arr={props.retailerNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              title={"RETAILER NOTES"}
              issueType={"retailer"}
              click={props.openDialog}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
    </Grid>
  );
};

RetailerComponent.propTypes = {
  fetchNotes: PropTypes.func,
  retailerNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
};

export { RetailerComponent };
