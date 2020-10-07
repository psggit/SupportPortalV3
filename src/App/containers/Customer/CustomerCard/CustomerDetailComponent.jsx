/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import CustomerDetailsCard from "../../../components/card";
import CustomerNotesCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { getDataList, getListOfDataObjects } from "../../../utils/helpers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Moment from "moment";
import Dialog from '../../../components/dialog'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { CircularProgress } from "@material-ui/core";

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
    padding: 24
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060"
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
  button: {
    color: "#FFFFFF",
    backgroundColor: "#0086AD",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "21px",
    borderRadius: "4px",
    marginLeft: "16px",
    border: "1.6px solid #0086AD"
  },
  buttonSecondary: {
    color: "#0086AD",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "21px",
    borderRadius: "4px",
    marginLeft: "16px",
    border: "1.6px solid #0086AD"
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
  "customer_id": "Customer ID",
  "customer_name": "Customer Name",
  "customer_contact_number": "Mobile Number",
  "city": "City",
  "dob": "Date of Birth",
  "signup_date": "Signup Date",
  "kyc_level": "KYC Level",
  "customer_landmark": "Landmark",
  "customer_address": "Address",
};


const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A");
};

const renderCustomerNotes = ({ dataMap, keysToRender }) => {
  const data = getDataList(dataMap, keysToRender);
  const classes = useStyles();

  return (
    <React.Fragment>
      {data.map((item, index) => {
        return (
          <List>
            <ListItem classes={{ root: classes.ListItemRoot }}>
              <ListItemText
                primary={item[keysToRender[0]]}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
              <ListItemText
                primary={getTimestamp(item[keysToRender[1]])}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextValue }}
              />
            </ListItem>
          </List>
        );
      })}
    </React.Fragment>
  );
};



const RenderCustomerDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {
          props.customerDetails.map((item, index) => {
            return (
              <ListItem classes={{ root: classes.ListCustomerItem }}>
                <ListItemText
                  primary={keyMap[keysToRender[index]]}
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
                <ListItemText
                  primary={item[keysToRender[index]] ? item[keysToRender[index]] : "-"}
                  className={classes.ListItemTextRoot}
                  classes={{ root: classes.ListItemTextLabel }}
                />
              </ListItem>
            )
          })
        }
      </List>
    </React.Fragment>
  )
}

const CustomerDetails = (props) => {
  console.log("customerID", props)

  const classes = useStyles();
  const [customerDetailsData, setCustomerDetailsData] = useState([])
  
  const orderId = props.orderInfo.order_id

  const [loading, setLoading] = useState(props.notesProgress);
  

  useEffect(() => {
    const payload = {
      order_id: orderId,
      type: "consumer"
    }
    props.fetchConsumerNotes(payload)
  },[])

  // useEffect(() => {
  //   setLoading(props.notesProgress)
  // }, [props.notesProgress])

  // if (loading) {
  //   return <CircularProgress />;
  // }



  useEffect(() => {
    const customerDetails = getListOfDataObjects(props.orderInfo, keysToRender)
    setCustomerDetailsData(customerDetails)
  }, [])

  const customerAction = [
    <Button variant="outlined" color="primary">Message</Button>,
    <Button variant="contained" color="primary">Call</Button>
  ];

  const customerNotesAction = [
    <Button variant="outlined" color="primary">Add</Button>,
  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  return (
    <div className={classes.container}>
      <CustomerDetailsCard
        title="Customer Details"
        actions={customerAction}
      >
        <RenderCustomerDetails customerDetails={customerDetailsData} />
      </CustomerDetailsCard>
      <CustomerNotesCard title="Customer Notes" actions={customerNotesAction}>
        {renderCustomerNotes({
          dataMap: props.orderDetails.timing_details,
          keysToRender: keysToRenderInNotesCard,
        })}
      </CustomerNotesCard>
    </div>
  );
}

export { CustomerDetails }

