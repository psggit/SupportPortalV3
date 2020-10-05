import React from 'react';
import DeliveryAgentDetailsCard from './components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

const RenderAgentDetails = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        <ListItem classes={{ root: classes.ListItemRoot }}>
          <ListItemText
            primary="Agent ID"
            className={classes.ListItemTextRoot}
            classes={{ root: classes.ListItemTextLabel }}
          />
          <ListItemText
            primary="123"
            className={classes.ListItemTextRoot}
            classes={{ root: classes.ListItemTextLabel }}
          />
        </ListItem>
      </List>
    </React.Fragment>
      // <div>
      //   <div className="title">Agent ID</div>
      //   <div className="value">123</div>
      // </div>
      // <div>
      //   <div className="title">Agent Name</div>
      //   <div className="value">Hello</div>
      // </div>
      // <div>
      //   <div className="title">Mobile Number</div>
      //   <div className="value">7639626759</div>
      // </div>
      // <div>
      //   <div className="title">City</div>
      //   <div className="value">Chennia</div>
      // </div>
      // <div>
      //   <div className="title">Locality</div>
      //   <div className="value">Adayar</div>
      // </div>
      // <div>
      //   <div className="title">Ageent Limit</div>
      //   <div className="value">12</div>
      // </div>
      // <div>
      //   <div className="title">Address</div>
      //   <div className="value">213123</div>
      // </div>
    // </React.Fragment>
  )
}

const DADetails = (props) => {
  const classes = useStyles();
  const deliveryAgentDetailsAction = [
    <Button variant="outlined" color="primary">Unassign</Button>,
    <Button variant="contained" color = "primary">Call</Button>
  ];

  return (
    <div className={classes.container}>
      <DeliveryAgentDetailsCard
        title="Delivery Agent Details"
        actions={deliveryAgentDetailsAction}
      >
        <RenderAgentDetails />
      </DeliveryAgentDetailsCard>
    </div>
  );
}

export {DADetails}