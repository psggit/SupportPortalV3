import React from 'react';
import CustomerDetailsCard from '../../../components/card'
import CustomerNotesCard from '../../../components/card'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { getDataList } from '../../../utils/helpers';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'moment';

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

const renderCustomerNotes = ({ dataMap, keysToRender }) => {
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

const renderCustomerDetails = () => {
  return (
    <React.Fragment>
      <div>
        <div className="title">Customer ID</div>
        <div className="value">123</div>
      </div>
      <div>
        <div className="title">Customer Name</div>
        <div className="value">Hello</div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div className="value">7639626759</div>
      </div>
      <div>
        <div className="title">City</div>
        <div className="value">Chennai</div>
      </div>
      <div>
        <div className="title">Date of Birth</div>
        <div className="value">-</div>
      </div>
      <div>
        <div className="title">Signup Date</div>
        <div className="value">-</div>
      </div>
      <div>
        <div className="title">KYC Level</div>
        <div className="value">-</div>
      </div>
      <div>
        <div className="title">Landmark</div>
        <div className="value">-</div>
      </div>
      <div>
        <div className="title">Delivery Address</div>
        <div className="value">-</div>
      </div>
    </React.Fragment>
  )
}

const CustomerDetails = (props) => {
  const classes = useStyles();
  const customerDetailsAction = [
    <Button variant="outlined" color="primary">message</Button>,
    <Button variant="contained" color="primary">Call</Button>
  ];

  const customerNotesAction = [
    <Button variant="contained" color="primary">Add</Button>
  ];

  const keysToRenderInNotesCard = ["message", "display_value"];

  return (
    <div className={classes.container}>
      <CustomerDetailsCard
        title="Customer Details"
        actions={customerDetailsAction}
      >
        {renderCustomerDetails()}
      </CustomerDetailsCard>
      <CustomerNotesCard
        title="Customer Notes"
        actions={customerNotesAction}
      >
        {renderCustomerNotes({
          dataMap: props.orderDetails.timing_details,
           keysToRender: keysToRenderInNotesCard
        })}
      </CustomerNotesCard>
    </div>
  );
}

export { CustomerDetails }