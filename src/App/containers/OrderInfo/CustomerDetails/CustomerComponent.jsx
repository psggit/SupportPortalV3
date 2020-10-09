/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import CustomerDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "../../../components/dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Box, Card } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

const useStyles = makeStyles(theme => ({
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
  "city",
  "dob",
  "signup_date",
  "kyc_level",
  "customer_landmark",
  "customer_address",
];
const keyMap = {
  customer_id: "Customer ID",
  customer_name: "Customer Name",
  customer_contact_number: "Mobile Number",
  city: "City",
  dob: "Date of Birth",
  signup_date: "Signup Date",
  kyc_level: "KYC Level",
  customer_landmark: "Landmark",
  customer_address: "Address",
};

const RenderCustomerDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {props.customerDetails.map((item, index) => {
          return (
            <ListItem classes={{ root: classes.ListCustomerItem }}>
              <ListItemText
                primary={keyMap[keysToRender[index]]}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
              <ListItemText
                primary={
                  item[keysToRender[index]] ? item[keysToRender[index]] : "-"
                }
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

const CustomerDetails = (props) => {
  const classes = useStyles();

  const [customerDetailsData, setCustomerDetailsData] = useState([])

  useEffect(() => {
    const payload = {
      order_id: props.orderInfo.order_id,
      type: "consumer",
    };
    props.fetchConsumerNotes(payload);
  }, []);

  useEffect(() => {
    const customerDetails = getListOfDataObjects(props.orderInfo, keysToRender);
    setCustomerDetailsData(customerDetails);
  }, []);

  const customerAction = [
    <Button variant="outlined" color="primary">
      Message
    </Button>,
    <Button variant="contained" color="primary">
      Call
    </Button>,
  ];

  const customerNotesAction = [
    <Button variant="outlined" color="primary">
      Add
    </Button>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.notesSuccess) {
    console.log("[CustomerComponent]");
    console.log(props.customerNotes);
  }

  // if(arr === null){
  //   return <p>No Notes Available</p>
  // }

  return (
    <div className={classes.container}>
      <CustomerDetailsCard title="Customer Details" actions={customerAction}>
        <RenderCustomerDetails customerDetails={customerDetailsData} />
      </CustomerDetailsCard>
      <CustomerDetailsCard title="Customer Notes" actions={customerNotesAction}>
        {props.notesSuccess && (
          <ActivityItem
            arr={props.customerNotes.orderNotes}
            keysToRender={keysToRenderInNotesCard}
            title={"Customer Notes"}
          />
        )}
        {props.notesProgress && <CircularProgress />}
      </CustomerDetailsCard>
    </div>
  );
};
CustomerDetails.propTypes = {
  fetchConsumerNotes: PropTypes.func,
  orderInfo: PropTypes.object,
  customerNotes: PropTypes.object,
  notesSuccess: PropTypes.bool,
  notesProgress: PropTypes.bool,
};
export { CustomerDetails };
