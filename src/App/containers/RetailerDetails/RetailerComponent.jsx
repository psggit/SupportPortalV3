import React, { useEffect, useState } from "react";
import RetailerDetailsCard from '../../components/card';
import RetailerNotesCard from '../../components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getDataList, getListOfDataObjects } from '../../utils/helpers';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'moment';
import PropTypes from "prop-types";
import Dialog from '../../components/dialog';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
  ListItem: {
    width: "100%",
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
  return Moment(timestamp).format("D MMM h:mm A");
};

const renderRetailerNotes = ({ dataMap, keysToRender }) => {
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

const keysToRender = [
  "retailer_id",
  "retailer_name",
  "retailer_contact_number",
  "city",
  "retailer_landmark",
  "retailer_limit",
  "retailer_address",
];
const keyMap = {
  "retailer_id": "Retailer ID",
  "retailer_name": "Retailer Name",
  "retailer_contact_number": "Mobile Number",
  "city": "City",
  "retailer_landmark": "Landmark",
  "retailer_limit": "Retailer Limit",
  "retailer_address": "Store Address",
};

const RenderRetailerDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {
          props.retailerDetails.map((item, index) => {
            return (
              <ListItem classes={{ root: classes.ListItem }}>
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

const RetailerDetails = (props) => {

  const classes = useStyles();
  const [retailerDetailsData, setRetailerDetailsData] = useState([])

  const orderId = props.orderInfo.order_id

  useEffect(() => {
    props.sendOrderId(orderId)
  }, [])

  useEffect(() => {
    const retailerDetails = getListOfDataObjects(props.orderInfo, keysToRender)
    setRetailerDetailsData(retailerDetails)
  }, [])

  const retailerAction = [
    <Button variant="outlined" color="primary">Message</Button>,
    <Button variant="contained" color="primary">Call</Button>
  ];

  const retailerNotesAction = [
    <Button variant="outlined" color="primary">Add</Button>,
  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  return (
    <div className={classes.container}>
      <RetailerDetailsCard
        title="Retailer Details"
        actions={retailerAction}
      >
        <RenderRetailerDetails retailerDetails={retailerDetailsData} />
      </RetailerDetailsCard>
      <RetailerNotesCard title="Retailer Notes" actions={retailerNotesAction}>
        {renderRetailerNotes({
          dataMap: props.orderDetails.timing_details,
          keysToRender: keysToRenderInNotesCard,
        })}
      </RetailerNotesCard>
    </div>
  );
}

RetailerDetails.propTypes = {
  fetchProgress: PropTypes.bool,
  fetchSuccess: PropTypes.bool,
  orderDetails: PropTypes.object,
  sendOrderId: PropTypes.any,
  orderInfo: PropTypes.any,
};

export {RetailerDetails}