import React, { useState } from "react"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Moment from "moment"
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';

const BlueRadio = withStyles({
  root: {
    color: '#0086AD',
    '&$checked': {
      color: '#0086AD',
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles(theme => ({
 formContainer: {},
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '24px',
    color: '#696969',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '21px',
  },
  navContent: {
    marginLeft: '22px',
  },
  section1: {
    padding: '34px 24px',
    letterSpacing: '0.012em',
    fontSize: '16px',
    color: '#696969',
    fontWeight: 'bold',
  },
  section2: {
    width: '60%',
    paddingLeft: '50px'
  },
  generalForm: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  label: {
    alignSelf: 'center'
  },
  textField: {
    marginBottom: '16px',
    backgroundColor: '#fff'
  },
  radioGroup: {
    display: 'flex',
  }

}));

function CustomerForm(){
  const classes = useStyles();

  const [customerName, setCustomerName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob]= useState("")
  const [signupDate, setSignupDate] = useState("")
  const [kycLevel, setKycLevel] = useState("")
  const [hipbarWalletBalance, setHipbarWalletBalance] = useState("")
  const [giftWalletBalance, setGiftWalletBalance] = useState("")

  const handleReset = () => {
    setCustomerName("")
    setMobileNumber("")
    setEmail("")
    setDob("")
    setSignupDate("")
    setKycLevel("")
    setHipbarWalletBalance("")
    setGiftWalletBalance("")
  }

  const handleSave = () => {
    console.log("value", mobileNumber,customerName,email,dob,signupDate,kycLevel,hipbarWalletBalance,giftWalletBalance)
  }

  return(
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div>SOA</div>
        </div>
        <div className={classes.navContent}>
          <div>Gift Soa</div>
        </div>
        <div className={classes.navContent}>
          <div>Rewards</div>
        </div>
        <div className={classes.navContent}>
          <div>Notes</div>
        </div>
      </div>
      <div className={classes.section1}>
        <p>CUSTOMER ID: 123</p>
      </div>
      <div className={classes.section2}>
        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Customer Name</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Gender</p>
          </div>
          <div className={classes.radioGroup}> 
            <div >
              <label>Female</label>
              <BlueRadio
              // checked={selectedValue === 'c'}
              // onChange={handleChange}
              // value="c"
              // name="radio-button-demo"
              // inputProps={{ 'aria-label': 'C' }}
              />
            </div>
            <div>
              <label>Male</label>
              <BlueRadio
              // checked={selectedValue === 'c'}
              // onChange={handleChange}
              // value="c"
              // name="radio-button-demo"
              // inputProps={{ 'aria-label': 'C' }}
              />
            </div>
            <div>
              <label>Not Spacified</label>
              <BlueRadio
              // checked={selectedValue === 'c'}
              // onChange={handleChange}
              // value="c"
              // name="radio-button-demo"
              // inputProps={{ 'aria-label': 'C' }}
              />
            </div>
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Mobile Number</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Email</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Date of Birth</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Signup Date</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              type="date"
              variant="outlined"
              name="signupDate"
              value={signupDate}
              onChange={(e) => setSignupDate(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>KYC Level</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="kycLevel"
              value={kycLevel}
              onChange={(e) => setKycLevel(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>HipBar Wallet Balance</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="hipbarWalletBalance"
              value={hipbarWalletBalance}
              onChange={(e) => setHipbarWalletBalance(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.generalForm}>
          <div className={classes.label}>
            <p>Gift Wallet Balance</p>
          </div>
          <div>
            <TextField
              className={classes.textField}
              variant="outlined"
              name="giftWalletBalance"
              value={giftWalletBalance}
              onChange={(e) => setGiftWalletBalance(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}

export {CustomerForm}