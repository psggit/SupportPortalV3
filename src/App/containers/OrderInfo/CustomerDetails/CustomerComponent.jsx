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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  ListCustomerItem: {
    width: "100%",
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
}));

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
  const [show, setShow] = useState(false);

  const handleChange = () => {
    history.push({
      pathname: "/customer-detail",
      state: {
        customerNumber: props.orderInfo.customer_contact_number,
        orderId: props.orderId,
        customerId: props.customerId,
        orderInfos: props.orderInfo,
      },
    });
  };

  const handleNotesChange = () => {
    history.push({
      pathname: "/notes",
      state: {
        customerId: props.customerId,
        orderId: props.orderId,
        customerNumber: props.orderInfo.customer_contact_number,
        orderInfos: props.orderInfo,
      },
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const details = getListOfDataObjects(props.orderInfo, keysToRender);
    setData(details);
    const payload = {
      order_id: props.orderInfo.order_id,
      type: "customer",
    };
    props.fetchConsumerNotes(payload);
    props.fetchConsumerNotesList();
  }, []);

  useEffect(() => {
    if (props.fetchFailed || props.fetchSuccess) {
      // console.log("[CustomerComponent]");
      setShow(true);
    }
  }, [props.fetchFailed, props.fetchSuccess]);

  const customerAction = [
    // <Button variant="outlined" color="primary">
    //   Message
    // </Button>,
    // <Button
    //   variant="contained"
    //   color="primary"
    //   key="unassignBtn"
    //   onClick={() => props.handleCall(props.orderInfo.customer_contact_number)}
    // >
    //   Call
    // </Button>,
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
    // console.log(props.customerNotes);
  }

  // console.log("[CustomerComponent]");

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <DetailsCard
          title="CUSTOMER DETAILS"
          // actions={customerAction}
          subheader={subheadAction}
          renderArray={data}
          keyMap={keyMap}
          keysToRender={keysToRender}
          id="customer-details"
        />
      </Grid>
      <Grid item xs={6}>
        <>
          {show && (
            <ActivityItem
              arr={props.customerNotes ? props.customerNotes.orderNotes : []}
              keysToRender={keysToRenderInNotesCard}
              title={"CUSTOMER NOTES"}
              subtitle={subheadNotesAction}
              issueType={"customer"}
              click={props.openDialog}
              cardActions={true}
              success={props.fetchSuccess}
              fail={props.fetchFailed}
              errorMsg={props.errorMsg}
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
  fetchFailed: PropTypes.bool,
  openDialog: PropTypes.any,
  handleCall: PropTypes.func,
};

export { CustomerDetails };
