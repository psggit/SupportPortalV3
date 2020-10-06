import React from 'react';
import RetailerDetailsCard from '../../../components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

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

const renderChangeRetailerDetails = () => {
  return (
    <React.Fragment>
      <div>
        <div className="title">Retailer ID</div>
        <div className="value">123456</div>
      </div>
      <div>
        <div className="title">Retailer Name</div>
        <div className="value">Tasmac</div>
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
        <div className="title">Locality</div>
        <div className="value">Adayar</div>
      </div>
      <div>
        <div className="title">Retailer Limit</div>
        <div className="value">12</div>
      </div>
      <div>
        <div className="title">Store Address</div>
        <div className="value">213123</div>
      </div>
    </React.Fragment>
  )
}

const ChangeRetailer = (props) => {
  const classes = useStyles();
  const retailerDetailsAction = [
    <Button variant="outlined" color="primary">Call</Button>,
    <Button variant="contained" color="primary">Select</Button>
  ];

  return (
    <div className={classes.container}>
      <RetailerDetailsCard
        title="Tasmac-1 Adyar"
        actions={retailerDetailsAction}
      >
        {renderChangeRetailerDetails()}
      </RetailerDetailsCard>
    </div>
  );
}

export { ChangeRetailer }