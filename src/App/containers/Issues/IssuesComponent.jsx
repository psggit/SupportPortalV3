import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Box } from "@material-ui/core";
import TopBar from "../../components/topBar";
import { Typography } from '@material-ui/core';
import Moment from "moment";
import Loading from "./../../components/loading";
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Dialog,
  DialogActions,
  DialogTitle
} from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden"
  },
  section1: {
    padding: 24,
    height:  `calc(100vh - 64px)`,
    boxShadow: "unset",
    borderRadius: 0,
  },
  typography: {
    fontSize: 18
  },
  section2: {
    padding: "64px 108px 0 108px",
    overflowY: "scroll"
  },
  paper: {
    marginBottom: 16,
    padding: "12px 22px",
    //textAlign: 'center'
  },
  grid: {
    alignItems: "center"
  },
  title: {
    fontSize: 16,
    color: "#0086AD"
  },
  subtitle: {
    fontSize: 14,
    color: "#606060"
  },
  dateStyle: {
    fontSize: 12,
    color: "#696969"
  },
  buttonStyke: {
    fontSize: 14
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: 12
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  }
}));

const RenderIssues = (props) => {
  const classes = useStyles();
  const colors = ["purple", "orange"];

  const [showDialog, setShowDialog] = useState(false);
  const [assignIssue, setAssignIssue] = useState(false);
  const [resolveIssue, setResolveIssue] = useState(false);
  const [orderId, setOrderId] = useState("");

  const unmountConfirmationDialog = () => {setShowDialog(false);}

  const mountConfirmationDialog = () => {setShowDialog(true);}

  const checkIsLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  const handleConfirmation = () => {
    const payload = {
      orderId: orderId
    };
  
    if (assignIssue) props.assignIssue(payload);
    else props.resolveIssue(payload);

    unmountConfirmationDialog();
  }

  const handleResolveIssue = (e, issue) => { 
    setResolveIssue(true);
    setOrderId(issue.order_id);
    mountConfirmationDialog();
  }

  const handleAssignIssue = (e, issue) => { 
    setAssignIssue(true); 
    setOrderId(issue.order_id);
    mountConfirmationDialog(); 
  }

  return (
    <>
      {
        props.issueList.issues.map((issue, index) => {
          const avatarColor = classes[colors[Math.floor(Math.random() * colors.length)]]
          return (
            <Paper className={classes.paper} key={`${issue.order_id}+${index}`}>
              <Grid container item xs={12} classes={{root: classes.grid}}>
                <Grid item xs={2}>
                  <ListItemText className={classes.title} primary={issue.order_id} />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText className={classes.subtitle} primary={issue.reason} />
                </Grid>
                <Grid item xs={3}>
                  <div className={classes.avatarContainer}>
                    <Avatar classes={{ root: classes.avatar }} className={avatarColor}>
                      {checkIsLetter(issue.assigned_to_name.charAt(0)) ? issue.assigned_to_name.charAt(0).toUpperCase() : ""}
                    </Avatar>
                    <ListItemText className={classes.subtitle} primary={issue.assigned_to_name} />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <ListItemText 
                    className={classes.dateStyle} 
                    primary={`${Moment(issue.assigned_time).format("D MMM")} at ${Moment(issue.assigned_time).format("hh:mm A")}`} 
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.buttonStyle} 
                    onClick={(e) => handleAssignIssue(e, issue)}
                    disabled={!issue.to_show_resolve || props.assignIssueInProgress}
                  >
                    ASSIGN TO
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={(e) => handleResolveIssue(e, issue)} 
                    disabled={!issue.to_show_resolve || props.resolveIssueInProgress}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          )
        })
      }
      {
        showDialog &&
        <Dialog
          open={showDialog}
          onClose={()=> unmountConfirmationDialog()}
        >
          <DialogTitle>
            {
              resolveIssue ? `Do ypu want to resolve issue?` : `Do you want to assign issue?`
            }
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => handleConfirmation()} color="primary" variant="outlined">
              Confirm
            </Button>
            <Button onClick={() => unmountConfirmationDialog()} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  )
}

const IssuesComponent = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchIssueList()
  }, []); 

  useEffect(() => {
    if (props.assignIssueSuccess || props.resolveIssueSuccess) {
      location.reload();
    }
  }, [props.assignIssueSuccess, props.resolveIssueSuccess])

  if(props.fetchIssuesInProgress) {
    return <Loading message="Loading Issues..." />;
  }

  return (
    <div className={classes.root}>
      <TopBar />
      <Box>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <Paper className={classes.section1}>
              <Typography classes={{root: classes.typography}}>ISSUES</Typography>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <div className={classes.section2}>
              {
                !props.fetchIssuesInProgress &&
                <RenderIssues {...props} />
              }
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export {IssuesComponent}