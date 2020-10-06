import React, {useEffect, useState} from 'react';
import DeliveryAgentDetailsCard from './components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {getListOfDataObjects} from './../../utils/helpers';

const keysToRender = ["delivery_agent_id", "delivery_agent_name", "delivery_agent_contact_number"];
const keyMap = {
  "delivery_agent_id": "Agent ID",
  "delivery_agent_name": "Agent Name",
  "delivery_agent_contact_number": "Mobile Number"
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ListItemRoot: {
    width: "100%",
    padding: 0,
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

const RenderAgentDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {
          props.deliveryAgentDetails.map((item, index) => {
            return (
              <ListItem classes={{ root: classes.ListItemRoot }}>
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

const DADetails = (props) => {

  const classes = useStyles();
  const [daDetailsData, setDADetailsData] = useState([])
 
  const deliveryAgentDetailsAction = [
    <Button variant="outlined" color="primary">Unassign</Button>,
    <Button variant="contained" color = "primary">Call</Button>
  ];

  useEffect(() => {
    const deliveryAgentDetails = getListOfDataObjects(props.orderDetails, keysToRender)
    setDADetailsData(deliveryAgentDetails)
  }, [])

  return (
    <div className={classes.container}>
      <DeliveryAgentDetailsCard
        title="Delivery Agent Details"
        actions={deliveryAgentDetailsAction}
      >
        <RenderAgentDetails deliveryAgentDetails={daDetailsData} />
      </DeliveryAgentDetailsCard>
    </div>
  );
}

export {DADetails}