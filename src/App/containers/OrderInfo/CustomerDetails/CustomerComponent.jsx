/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DetailsCard from "../../../components/orderInfoCard";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";
import { useHistory } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const keysToRender = [
  "customer_id",
  "customer_name",
  "customer_contact_number",
  "customer_city",
  "customer_dob",
  "customer_sign_up_date",
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
  customer_sign_up_date: "Signup Date",
  customer_kyc: "KYC Level",
  customer_landmark: "Landmark",
  customer_address: "Address",
};

const CustomerDetails = (props) => {
  const history = useHistory();
  const handleChange = () => {
    history.push("/customer-detail");
  };

  const handleNotesChange = () => {
    history.push("/notes");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchConsumerNotes(props.orderInfo.order_id);
  }, []);

  const customerAction = [
    <Button variant="outlined" color="primary">
      Message
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="unassignBtn"
      onClick={() => props.handleCall(props.orderInfo.customer_contact_number)}
    >
      Call
    </Button>,
  ];

  const subheadAction = [
    <Button
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleChange}
    >
      More
    </Button>,
  ];

  const subheadNotesAction = [
    <Button
      color="primary"
      endIcon={<ChevronRightIcon />}
      onClick={handleNotesChange}
    >
      More
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.notesSuccess) {
    // console.log("[CustomerComponent]");
    // console.log(props.customerNotes);
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DetailsCard
          title="CUSTOMER DETAILS"
          actions={customerAction}
          subheader={subheadAction}
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
              subtitle={subheadNotesAction}
              issueType={"customer"}
              click={props.openDialog}
              cardActions={true}
            />
          )}
          {props.fetchProgress && <CircularProgress />}
        </>
      </Grid>
    </Grid>
  );
};

CustomerDetails.propTypes = {
  fetchConsumerNotes: PropTypes.func,
  customerNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
  handleCall: PropTypes.func,
};

export { CustomerDetails };
