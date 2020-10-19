import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";

const keysToRender = [
  "retailer_id",
  "retailer_name",
  "retailer_contact_number",
  "retailer_city_name",
  "retailer_locality",
  "retailer_limit",
  "retailer_address",
];
const keyMap = {
  retailer_id: "Retailer ID",
  retailer_name: "Retailer Name",
  retailer_contact_number: "Mobile Number",
  retailer_city_name: "City",
  retailer_locality: "Locality",
  retailer_limit: "Retailer Limit",
  retailer_address: "Store Address",
};

const RetailerDetails = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    props.fetchNotes(props.orderInfo.order_id);
  }, []);

  const history = useHistory();

  const handleMore = () => {
    history.push("/retailer-notes");
  };

  const actionButtons = [
    <Button variant="outlined" color="primary" key="unassignBtn">
      Unassign
    </Button>,
    <Button
      variant="contained"
      color="primary"
      key="callBtn"
      onClick={() => props.handleCall(props.orderInfo.retailer_contact_number)}
    >
      Call
    </Button>,
  ];

  const retailerNotes = [
    // eslint-disable-next-line react/jsx-key
    <Button color="primary" endIcon={<ChevronRightIcon />} onClick={handleMore}>
      Add more
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
          id="retailers-details"
        />
      </Grid>
      <Grid item xs={6}>
        <>
          {props.fetchSuccess && (
            <ActivityItem
              arr={props.retailerNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              title={"RETAILER NOTES"}
              subtitle={retailerNotes}
              issueType={"retailer"}
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
RetailerDetails.propTypes = {
  fetchNotes: PropTypes.func,
  retailerNotes: PropTypes.object,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  openDialog: PropTypes.any,
  handleCall: PropTypes.func,
};
export { RetailerDetails };
