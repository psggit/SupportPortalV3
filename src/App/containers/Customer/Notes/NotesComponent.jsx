/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Table from '../../../components/table'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Pagination from '../../../components/pagination'
import Moment from "moment"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from '../../../utils/helpers';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '../../../components/dialog'
import { useHistory } from "react-router-dom";

const tableHeaders = [
  { label: "NOTE NO", value: "note_no" },
  { label: "NOTE TYPE", value: "note_type" },
  { label: "DESCRIPTION", value: "desc" },
  { label: "CREATED BY", value: "created_by" },
  { label: "CREATED AT", value: "created_at" },
]

function Notes(props) {
  const history = useHistory();
  const classes = useStyles();

  const pageLimit = 2
  const activePage = getQueryParamByName("activePage") || 1
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false)
  const [age, setAge] = useState('');

  useEffect(() => {
    const payload = {
      order_id: props.orderInfo.order_id,
      type: "consumer",
    };
    props.fetchConsumerNotes(payload);
  }, []);

  const handleGiftSoaChange = () => {
    console.log("gift-soa");
    history.push("/gift-soa");
  };

  const handleRewardChange = () => {
    console.log("rewards");
    history.push("/rewards");
  };

  const handleSoaChange = () => {
    console.log("soa");
    history.push("/soa");
  };

  const handleNotesChange = () => {
    history.push("/notes");
  }

  const handleCustomerDetail = () => {
    history.push("/customer-detail");
  };

  const handleBack = () => {
    history.push("/order-details")
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true)
  }

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false)
  }

  // const handlePageChange = (pageObj) => {
  //   setPageNo(pageObj.activePage)
  //   const queryParamsObj = {
  //     activePage: pageObj.activePage,
  //   }
  //   history.pushState(queryParamsObj, "soa listing", `/soa ${getQueryUri(queryParamsObj)}`)
  // }

  let loading = props.notesProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div onClick={handleBack}>Back</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleCustomerDetail}>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleSoaChange}>SOA</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleGiftSoaChange}>Gift Soa</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleRewardChange}>Rewards</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleNotesChange}>Notes</div>
        </div>
      </div>
      <div className={classes.row1}>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>
          <Button
            className={classes.Button}
            variant="contained"
            onClick={mountAddNote}
          >
            Add Note
          </Button>
          {
            showAddNoteDilog &&
            <Dialog
              title="ADD NOTE"
              actions={[
                <Button
                  variant="contained"
                  buttonStyle="secondary"
                  onClick={UnmountAddNote}
                >
                  Cancel
                </Button>,
                <Button
                  variant="contained"
                //onClick={commentUnmountModel}
                >
                  Save
                </Button>
              ]}
            >
              <form>
                <div className={classes.selectIssue}>
                  <div>Select Issue</div>
                  <div>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className={classes.formRoot}>
                  <TextareaAutosize
                    className={classes.formControlTextarea}
                    aria-label="minimum height"
                    rowsMin={7}
                    //onChange={handleCommentChange}
                    placeholder="Add note here"
                  />
                </div>
              </form>
            </Dialog>
          }
        </div>
      </div>
      <div className={classes.table}>
        <Table tableHeaders={tableHeaders}>
          {
            props.notesSuccess
            ? props.customerNotes.orderNotes.map((data) => {
              return (
                <TableRow>
                  <TableCell>{data.order_id}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell>{data.notes}</TableCell>
                  <TableCell align="left">{data.created_by}</TableCell>
                  <TableCell align="left">{Moment(data.created_at).format("DD/MM/YYYY h:mm A")}</TableCell>
                </TableRow>
              )
            })
            : !props.notesSuccess && (
                <tr>
                  <td
                    style={{ textAlign: "center", padding: "10px 0" }}
                    colSpan="6"
                  >
                    <p style={{ fontWeight: "16px" }}>No records found</p>
                  </td>
                </tr>
            )}
        </Table>
        {/* <Pagination
          activePage={parseInt(pageNo)}
          //itemsCountPerPage={parseInt(pageLimit)}
          rowsPerPage={parseInt(pageLimit)}
          count={props.notes.count}
          setPage={handlePageChange}
          color="primary"
        /> */}
      </div>
    </div>
  )
}

Notes.propTypes = {
  customerNotes: PropTypes.array,
  fetchConsumerNotes: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  customerId: PropTypes.any,
};

export { Notes }

const useStyles = makeStyles(theme => ({
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
  row1: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '34px 24px',
    letterSpacing: '0.012em',
    fontSize: '16px',
    color: '#696969',
    fontWeight: 'bold',
  },
  table: {
    padding: '0px 25px'
  },
  formRoot: {
    padding: 24
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060"
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
  button: {
    color: "#FFFFFF",
    backgroundColor: "#0086AD",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "21px",
    borderRadius: "4px",
    marginLeft: "16px",
    border: "1.6px solid #0086AD"
  },

}));

