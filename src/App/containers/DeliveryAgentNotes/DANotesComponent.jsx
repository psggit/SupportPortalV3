import React, {useEffect, useState} from 'react';
import DeliveryNotesCard from './../DeliveryAgentDetails/components/card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Moment from 'moment';
import { CircularProgress } from '@material-ui/core';
import {getDataList} from './../../utils/helpers';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  ListItemRoot: {
    width: "100%",
    borderBottom: "1px solid #E5E5E5",
    fontSize: 16,
    padding: 0,
    color: "#606060"
  },
  ListItemTextRoot: {
    wordBreak: "break-word"
  },
  ListItemTextLabel: {
    width: "70%"
  },
  ListItemTextValue: {
    width: "30%",
    textAlign: "right"
  }
}));

const getTimestamp = (timestamp) => {
  return Moment(timestamp).format("D MMM h:mm A")
}

const keysToRender = ["notes", "created_at"];

const RenderAgentNotes = ({notes}) => {
  const classes = useStyles();
  const data = getDataList(notes, keysToRender)
  return (
    <React.Fragment>
      {
        data && data.map((item, index) => {
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

const DANotes = (props) => {

  const classes = useStyles();
  const [notes, setNotes] = useState(props.daNotes);
  const [loading, setIsLoading] = useState(props.fetchDANotesProgress);

  const deliveryAgentNotesAction = [
    <Button variant="contained" color="primary">Add</Button>
  ];

  useEffect(() => {
    const payload = {
      order_id: props.orderId,
      type: "delivery_agent"
    };
    props.fetchDANotes(payload);
  }, [])

  useEffect(() => {
    if(!props.fetchDANotesProgress && props.daNotes) {
      setIsLoading(props.fetchDANotesProgress);
      setNotes(props.daNotes);
    }
  }, [props.fetchDANotesProgress, props.daNotes])

  return (
    <>
      {
        <DeliveryNotesCard
          title="Delivery Agent Notes "
          actions={deliveryAgentNotesAction}
          moreOption={true}
        >
          {
            loading &&
            <CircularProgress />
          }
          {
            !loading && notes !== null &&
            <RenderAgentNotes notes={notes} />
          }
          {
            !loading && notes === null &&
            <List>
              <ListItem classes={{ root: classes.ListItemRoot }}>
                <ListItemText primary="No data found" />
              </ListItem>
            </List>
          }
        </DeliveryNotesCard>
      }
    </>
  );
}

export default React.memo(DANotes);