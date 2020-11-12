import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import DetailsCard from "../../../components/orderInfoCard";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

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
    if (localStorage.getItem("x-hasura-role") !== "ops_delivery_manager") {
      props.fetchNotes(props.orderInfo.order_id);
    }
  }, []);

  const history = useHistory();

  const handleMore = () => {
    history.push({
      pathname: "/retailer-notes",
      state: {
        orderId: props.orderInfo.order_id,
        customerId: props.orderInfo.customer_id,
      },
    });
  };

  const handleChangeRetailer = () => {
    let skuId = props.orderInfo.cart_items.map((item) => item.sku_id);
    history.push({
      pathname: "/change-retailer",
      state: {
        orderId: props.orderInfo.order_id,
        retailerId: props.orderInfo.retailer_id,
        stateId: props.orderInfo.state_id,
        cityId: props.orderInfo.city_id,
        skuId: skuId,
        cartItems: props.orderInfo.cart_items,
        orderInfo: props.orderInfo,
      },
    });
  };

  const actionButtons = [
    <Button
      variant="outlined"
      color="primary"
      key={uuid()}
      onClick={handleChangeRetailer}
      disabled={!props.orderInfo.cancel_order_button}
    >
      Change Retailer
    </Button>,
    // <Button
    //   variant="contained"
    //   color="primary"
    //   key="callBtn"
    //   onClick={() => props.handleCall(props.orderInfo.retailer_contact_number)}
    // >
    //   Call
    // </Button>,
  ];

  const retailerNotes = [
    // eslint-disable-next-line react/jsx-key
    <Button color="primary" endIcon={<ChevronRightIcon />} onClick={handleMore}>
      More
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DetailsCard
          title="RETAILER DETAILS"
          actions={
            localStorage.getItem("x-hasura-role") !== "support_person" &&
            actionButtons
          }
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
