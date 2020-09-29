import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    width: '40%',
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
          <Button>Reset</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export {CustomerForm}