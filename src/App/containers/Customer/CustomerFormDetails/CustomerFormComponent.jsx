import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
 formContainer: {},

 navItems: {
   backgroundColor: '#fff'
 }

}));

function CustomerForm(){
  const classes = useStyles();

  return(
    <div className={classes.formContainer}>
      <div className={classes.navItems}>
        <div></div>
      </div>
      puja
    </div>
  )
}

export {CustomerForm}