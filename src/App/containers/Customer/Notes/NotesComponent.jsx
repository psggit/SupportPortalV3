
import React, { useState } from 'react';
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


const tableHeaders = [
  { label: "NOTE NO", value: "note_no" },
  { label: "NOTE TYPE", value: "note_type" },
  { label: "DESCRIPTION", value: "desc" },
  { label: "CREATED BY", value: "created_by" },
  { label: "CREATED AT", value: "created_at" },
]

function Notes(props) {
  console.log("props..hy", props.notes.data, props.notes.count)
  const classes = useStyles();

  const pageLimit = 2
  const activePage = getQueryParamByName("activePage") || 1
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false)
  const [age, setAge] = useState('');

  const handleSoa = (e) => {
    e.preventDefault()
    location.href="/soa/123"
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

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage,
    }
    history.pushState(queryParamsObj, "soa listing", `/soa/123${getQueryUri(queryParamsObj)}`)
  }

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleSoa}>SOA</div>
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
      <div className={classes.row1}>
        <p>CUSTOMER ID: 123</p>
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
            props.notes.data.map((data, index) => {
              return (
                <TableRow>
                  <TableCell>{data.note_no}</TableCell>
                  <TableCell>{data.note_type}</TableCell>
                  <TableCell>{data.desc}</TableCell>
                  <TableCell align="left">{Moment(data.created_by).format("DD/MM/YYYY h:mm A")}</TableCell>
                  <TableCell align="left">{Moment(data.created_at).format("DD/MM/YYYY h:mm A")}</TableCell>
                </TableRow>
              )
            })
          }
        </Table>
        <Pagination
          activePage={parseInt(pageNo)}
          //itemsCountPerPage={parseInt(pageLimit)}
          rowsPerPage={parseInt(pageLimit)}
          count={props.notes.count}
          setPage={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  )
}

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

