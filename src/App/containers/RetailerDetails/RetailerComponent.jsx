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

  const orderId = props.orderInfo.order_id

  useEffect(() => {
    props.sendOrderId(orderId)
  },[])

  const classes = useStyles();

  let loading = props.fetchProgress;

  console.log("useEffect", props)

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false)
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true)
  }

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false)
  }
  
  const retailerDetailsAction = [
    <Button variant="outlined" color="primary">Change Retailer</Button>,
    <Button variant="contained" color="primary">Call</Button>
  ];

  const retailerNotesAction = [
    <div>
      <Button variant="contained" color="primary" onClick={mountAddNote}>
        Add
    </Button>,
    {
        showAddNoteDilog &&
        <Dialog
          title="ADD NOTE"
          actions={[
            <Button
              variant="contained"
              buttonStyle="secondary"
              onClick={UnmountAddNote}
            >
              Cancel
                </Button>,
            <Button
              variant="contained"
            //onClick={commentUnmountModel}
            >
              Save
                </Button>
          ]}
        >
          <form>
            <div className={classes.selectIssue}>
              <div>Select Issue</div>
              <div>
                <FormControl className={classes.formControl}>
                  <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={classes.formRoot}>
              <TextareaAutosize
                className={classes.formControlTextarea}
                aria-label="minimum height"
                rowsMin={7}
                //onChange={handleCommentChange}
                placeholder="Add note here"
              />
            </div>
          </form>
        </Dialog>
      }
    </div>  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  if (loading) {
    return (
      <Box>
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      </Box>
    );
  }
  
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