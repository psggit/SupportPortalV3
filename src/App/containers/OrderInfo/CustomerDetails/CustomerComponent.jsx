import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

const keysToRender = [
  "customer_id",
  "customer_name",
  "customer_contact_number",
  "customer_city",
  "customer_dob",
  "signup_date",
  "customer_kyc",
  "customer_landmark",
  "customer_address",
];
const keyMap = {
  customer_id: "Customer ID",
  customer_name: "Customer Name",
  customer_contact_number: "Mobile Number",
  customer_city: "City",
  customer_dob: "Date of Birth",
  signup_date: "Signup Date",
  customer_kyc: "KYC Level",
  customer_landmark: "Landmark",
  customer_address: "Address",
};

const ConsumerComponent = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const actionButtons = [
    <Button
      variant="contained"
      color="primary"
      key="unassignBtn"
      onClick={() => props.handleCall(props.orderInfo.customer_contact_number)}
    >
      Call
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DetailsCard
          title="CUSTOMER DETAILS"
          actions={actionButtons}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="customer-details"
        />
      </Grid>
      <Grid item xs={6}>
        <>
          {props.fetchSuccess && (
            <ActivityItem
              arr={props.customerNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              title={"CUSTOMER NOTES"}
              issueType={"customer"}
              click={props.openDialog}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
    </Grid>
  );
};

ConsumerComponent.propTypes = {
  fetchNotes: PropTypes.func,
  customerNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
  handleCall: PropTypes.func,
};

export { ConsumerComponent };
