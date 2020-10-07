/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import CustomerDetailsCard from "../../../components/card";
import CustomerNotesCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { getDataList } from "../../../utils/helpers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Moment from "moment";
import Dialog from '../../../components/dialog'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const renderCustomerDetails = (props) => {
    const customerDetails = props.orderInfo
    const orderId = props.orderInfo.order_id

  useEffect(() => {
    const payload = {
      order_id: orderId,
      type: "consumer"
    }
    props.fetchConsumerNotes(payload)
  },[])
  
  return (
    <React.Fragment>
      <div>
        <div className="title">Customer ID</div>
        <div className="value">{customerDetails.customer_id ? customerDetails.customer_id : "-"}</div>
      </div>
      <div>
        <div className="title">Customer Name</div>
        <div className="value">{customerDetails.customer_name ? customerDetails.customer_name : "-"}</div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div className="value">{customerDetails.customer_contact_number ? customerDetails.customer_contact_number : "-"}</div>
      </div>
      <div>
        <div className="title">City</div>
        <div className="value">{customerDetails.customer_city ? customerDetails.customer_city : "-"}</div>
      </div>
      <div>
        <div className="title">Date of Birth</div>
        <div className="value">{customerDetails.customer_dob ? customerDetails.customer_dob : "-"}</div>
      </div>
      <div>
        <div className="title">Signup Date</div>
        <div className="value">{customerDetails.customer_signup ? customerDetails.customer_signup : "-"}</div>
      </div>
      <div>
        <div className="title">KYC Level</div>
        <div className="value">{customerDetails.customer_kyc ? customerDetails.customer_kyc : "-"}</div>
      </div>
      <div>
        <div className="title">Landmark</div>
        <div className="value">{customerDetails.customer_landmark ? customerDetails.customer_landmark : "-"}</div>
      </div>
      <div>
        <div className="title">Delivery Address</div>
        <div className="value">{customerDetails.customer_address ? customerDetails.customer_address : "-"}</div>
      </div>
    </React.Fragment>
  );
};

const CustomerDetails = (props) => {

  //console.log("customerID", props.orderInfo, props.notesData)
  const classes = useStyles();
  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [noteValue, setNoteValue] = useState(""); 

  const handleSaveNotes = (e) => {
    e.preventDefault()
    console.log("save notes")
  }

  const handleNoteChange = (e) => {
    setNoteValue(e.target.value)
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true)
  }

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false)
  }

  const customerDetailsAction = [
    <Button variant="outlined" color="primary">
      message
    </Button>,
    <Button variant="contained" color="primary">
      Call
    </Button>,
  ];

  const customerNotesAction = [
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
              className={classes.buttonSecondary}
              onClick={UnmountAddNote}
            >
              Cancel
                </Button>,
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleSaveNotes}
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
                    value={selectedOption}
                    onChange={handleSelectChange}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={10}>Issue 1</MenuItem>
                    <MenuItem value={20}>Issue 2</MenuItem>
                    <MenuItem value={30}>Issue 3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className={classes.formRoot}>
              <TextareaAutosize
                className={classes.formControlTextarea}
                aria-label="minimum height"
                rowsMin={7}
                onChange={handleNoteChange}
                placeholder="Add note here"
              />
            </div>
          </form>
        </Dialog>
      }
    </div>
  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  return (
    <div className={classes.container}>
      <CustomerDetailsCard
        title="Customer Details"
       // actions={customerDetailsAction}
      >
        {renderCustomerDetails(props)}
      </CustomerDetailsCard>
      <CustomerNotesCard title="Customer Notes" actions={customerNotesAction}>
        {/* {
          props.notesData !== null ? 
          <div>
            {
              props.notesData.orderNotes.map((item) => item.notes)
            }
          </div> : 
          <div>No records found</div>
        } */}
        {renderCustomerNotes({
          dataMap: props.orderDetails.timing_details,
          keysToRender: keysToRenderInNotesCard,
        })}
      </CustomerNotesCard>
    </div>
  );
};

export { CustomerDetails };
