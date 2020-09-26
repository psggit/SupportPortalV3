import React from 'react';
import DeliveryAgentDetailsCard from './components/card';
import DeliveryNotesCard from './components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const renderAgentNotes = () => {
  return (
    <React.Fragment>
      <div className="note-section">
        <p className="note-desc">Not online for 3 days.</p>
        <p className="note-value">15 Jun 12:12 PM</p>
      </div>
      <div className="note-section">
        <p className="note-desc">Delivery agent updated phone number</p>
        <p className="note-value">15 Jun 12:12 PM</p>
      </div>
      <div className="note-section">
        <p className="note-desc">Delivery agent updated phone number</p>
        <p className="note-value">15 Jun 12:12 PM</p>
      </div>
    </React.Fragment>
  )
}

const renderAgentDetails = () => {
  return (
    <React.Fragment>
      <div>
        <div className="title">Agent ID</div>
        <div className="value">123</div>
      </div>
      <div>
        <div className="title">Agent Name</div>
        <div classname="value">Hello</div>
      </div>
      <div>
        <div className="title">Mobile Number</div>
        <div classname="value">7639626759</div>
      </div>
      <div>
        <div className="title">City</div>
        <div classname="value">Chennia</div>
      </div>
      <div>
        <div className="title">Locality</div>
        <div classname="value">Adayar</div>
      </div>
      <div>
        <div className="title">Ageent Limit</div>
        <div classname="value">12</div>
      </div>
      <div>
        <div className="title">Address</div>
        <div classname="value">213123</div>
      </div>
    </React.Fragment>
  )
}

const DeliveryAgentDetails = () => {
  const classes = useStyles();

  const deliveryAgentDetailsAction = [
    <Button variant="outlined" color="primary">Unassign</Button>,
    <Button variant="contained" color = "primary">Call</Button>
  ];

  const deliveryAgentNotesAction = [
    <Button variant="contained" color="primary">Add</Button>
  ];

  return (
    <div className={classes.container}>
      <DeliveryAgentDetailsCard
        title="Delivery Agent Details"
        actions={deliveryAgentDetailsAction}
      >
        {renderAgentDetails()}
      </DeliveryAgentDetailsCard>
      <DeliveryNotesCard
        title="Delivery Agent Notes"
        actions={deliveryAgentNotesAction}
      >
        {renderAgentNotes()}
      </DeliveryNotesCard>
    </div>
  );
}

export {DeliveryAgentDetails}