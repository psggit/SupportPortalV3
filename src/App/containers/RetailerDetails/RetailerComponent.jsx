import React, { useEffect, useState } from "react";
import RetailerDetailsCard from '../../components/card';
import RetailerNotesCard from '../../components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getDataList } from '../../utils/helpers';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'moment';
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ListItemRoot: {
    width: "100%",
    borderBottom: "1px solid #E5E5E5",
    fontSize: 16,
    color: "#606060"
  },
  ListItemTextRoot: {
    wordBreak: "break-word"
  },
  ListItemTextLabel: {
    width: "70%"
  },
  ListItemTextValue: {
    width: "30%"
  }
}));

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A")
}

const renderRetailerNotes = ({ dataMap, keysToRender }) => {
  const data = getDataList(dataMap, keysToRender)
  const classes = useStyles();
  return (
    <React.Fragment>
      {
        data.map((item, index) => {
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
          )
        })
      }
    </React.Fragment>
  )
}

const renderRetailerDetails = (props) => {
  const retailerDetails = props.orderInfo;

  console.log("renderRetailerDetails", retailerDetails,props.retailerDetails)
  return (
    <React.Fragment>
      <div>
        <div className="title">Retailer ID</div>
        <div className="value">{retailerDetails.retailer_id ? `${retailerDetails.retailer_id}` : "-"}</div>
      </div>
      <div>
        <div className="title">Retailer Name</div>
        <div className="value">{retailerDetails.retailer_name ? `${retailerDetails.retailer_name}` : "-"}</div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div className="value">{retailerDetails.retailer_contact_number ? `${retailerDetails.retailer_contact_number}` : "-"}</div>
      </div>
      <div>
        <div className="title">City</div>
        <div className="value">{retailerDetails.retailer_city ? `${retailerDetails.retailer_city}` : "-"}</div>
      </div>
      <div>
        <div className="title">Locality</div>
        <div className="value">{retailerDetails.retailer_locality ? `${retailerDetails.retailer_locality}` : "-"}</div>
      </div>
      <div>
        <div className="title">Retailer Limit</div>
        <div className="value">{retailerDetails.retailer_limit ? `${retailerDetails.retailer_limit}` : "-"}</div>
      </div>
      <div>
        <div className="title">Store Address</div>
        <div className="value">{retailerDetails.retailer_address ? `${retailerDetails.retailer_address}` : "-"}</div>
      </div>
    </React.Fragment>
  )
}

const RetailerDetails = (props) => {

  console.log("useEffect", props.orderInfo.retailer_id)

  const classes = useStyles();
  const retailerDetailsAction = [
    <Button variant="outlined" color="primary">Change Retailer</Button>,
    <Button variant="contained" color="primary">Call</Button>
  ];

  const retailerNotesAction = [
    <Button variant="contained" color="primary">Add</Button>
  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  return (
    <div className={classes.container}>
      <RetailerDetailsCard
        title="Retailer Details"
        actions={retailerDetailsAction}
      >
        {renderRetailerDetails(props)}
      </RetailerDetailsCard>
      <RetailerNotesCard
        title="Retailer Notes"
        actions={retailerNotesAction}
      >
        {renderRetailerNotes({
          dataMap: props.orderDetails.timing_details,
          keysToRender: keysToRenderInNotesCard
        })}
      </RetailerNotesCard>
    </div>
  );
}

export { RetailerDetails }