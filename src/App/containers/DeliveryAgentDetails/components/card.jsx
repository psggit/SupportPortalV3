import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({  
  root: {
    padding: 24,
    width: 492,
    '& .MuiCardHeader-root': {
      padding: 0
    },
    '& .MuiCardContent-root': {
      padding: 0
    }
  },
  cardHeader: {
    '& .MuiCardHeader-content': {
      paddingBottom: 12,
      '& > span': {
        fontSize: 16,
        fontWeight: "bold",
        textTransform: 'uppercase'
      }
    }
  },
  cardContent: {
    '& > div': {
      fontSize: 16,
      color: "#606060",
      width: '100%',
      // display: 'flex',
      // padding: '12px 0',
      '& .title': {
        width: "30%"
      },
      '& .value': {
        width: "70%"
      }
    }
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '& .MuiListItemText-root ': {
      color: "#0086AD"
    },
    '& button': {
      paddingLeft: 8
    }
  }
}));

export default function CustomCard (props) {
  const {title, actions, children} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {
        props.moreOption &&
        <CardHeader
          className={classes.cardHeader}
          title={title}
          action={
            <div className={classes.option}>
              <ListItemText primary="More" />
              <IconButton aria-label="settings" color="primary" >
                <ArrowForwardIosIcon color="primary" />
              </IconButton>
            </div>
          }
        />
      }
      {
        !props.moreOption &&
        <CardHeader
          className={classes.cardHeader}
          title={title}
        />
      }
      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
      {
        actions ?
          <CardActions className={classes.cardActions}>
            {actions.map(item => item)}
          </CardActions>
          : ''
      }
    </Card>
  )
}