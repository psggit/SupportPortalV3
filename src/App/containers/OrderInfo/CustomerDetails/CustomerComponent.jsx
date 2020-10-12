import React, { useEffect, useState } from "react";
import CustomerDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import { getListOfDataObjects } from "../../../utils/helpers";

const useStyles = makeStyles(() => ({
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

const RenderCustomerDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {props.customerDetails.map((item, index) => {
          return (
            <ListItem key={index} classes={{ root: classes.ListCustomerItem }}>
              <ListItemText
                primary={keyMap[keysToRender[index]]}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
                disableGutters={true}
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

  const [customerDetailsData, setCustomerDetailsData] = useState([]);

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
    <Button variant="outlined" color="primary" key="messageBtn">
      Message
    </Button>,
    <Button variant="contained" color="primary" key="callBtn">
      Call
    </Button>,
  ];

  const customerNotesAction = [
    <Button variant="outlined" color="primary" key="addBtn">
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
    <Grid container spacing={4}>
      <Grid item xs={6}>
        {/* {<CustomerDetailsCard title="Customer Details" actions={customerAction}>
          <RenderCustomerDetails customerDetails={customerDetailsData} />
        </CustomerDetailsCard>} */}
      </Grid>
      <Grid item xs={6}>
        <>
          {props.notesSuccess && (
            <ActivityItem
              arr={props.customerNotes.orderNotes}
              keysToRender={keysToRenderInNotesCard}
              title={"Customer Notes"}
              issueType={"customer"}
              click={props.openDialog}
            />
          )}
          {props.notesProgress && <CircularProgress />}
        </>
      </Grid>
    </Grid>
  );
};
CustomerDetails.propTypes = {
  fetchConsumerNotes: PropTypes.func,
  orderInfo: PropTypes.object,
  customerNotes: PropTypes.object,
  notesSuccess: PropTypes.bool,
  notesProgress: PropTypes.bool,
  openDialog: PropTypes.any,
  customerDetails: PropTypes.any,
};
export { CustomerDetails };
