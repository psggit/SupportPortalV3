/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "../../../components/dialog";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import FullWidthTabs from "../customerMenuBar";
import Loading from "../../../components/loading";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ErrorMsg from "../../../components/errorMsg";
import { Typography } from "@material-ui/core";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import uuid from "react-uuid";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
  Grid,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const createData = ({ order_id, type, notes, created_at, created_by }) => {
  return {
    order_id,
    type,
    notes,
    created_at,
    created_by,
  };
};

function Notes(props) {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [showData, setShowData] = useState(false);
  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [noteData, setNoteData] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [selectedValue, setValue] = useState("");
  const orderInfos = history.location.state.orderInfos;
  const customerId = history.location.state.customerId;
  const orderId = history.location.state.orderId;
  const customerNumber = history.location.state.customerNumber;

  const fetchNote = () => {
    const payload = {
      order_id: orderId,
      type: "customer",
    };
    props.fetchConsumerNotes(payload);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     location.reload();
  //   }, 2500);
  // }, [props.createNotesSuccess]);

  useEffect(() => {
    if (props.notesSuccess) {
      if (props.customerNotes.orderNotes !== null) {
        loopData(props.customerNotes.orderNotes);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
    return () => {
      props.resetOnUnmount();
    };
  }, [props.notesSuccess]);

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleTextChange = (e) => {
    setNoteData(e.target.value);
    setDisableBtn(false);
    if (e.target.value.trim().length > 0 && selectedValue !== null) {
      setDisableBtn(true);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
    props.fetchConsumerNotesList();
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  const handleAddNoteSubmit = () => {
    let payload = {
      order_id: orderId,
      type: "customer",
      notes: noteData,
      consumer_issue_type: parseInt(selectedValue),
    };
    props.createNotes(payload);
    setShowAddNoteDialog(false);
    fetchNote();
  };

  // console.log(props.errorMsg, props.notesFail);

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={
            localStorage.getItem("x-hasura-role") !== "support_person" ? 5 : 3
          }
          orderId={orderId}
          customerId={customerId}
          customerNumber={customerNumber}
          orderInfos={orderInfos}
        />
        <div className={classes.row1}>
          <Typography>
            <p>CUSTOMER ID: {customerId}</p>
          </Typography>
          <div>
            <Button variant="contained" onClick={mountAddNote} color="primary">
              Add Note
            </Button>
            {showAddNoteDilog && (
              <Dialog
                title="ADD NOTE"
                actions={[
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={UnmountAddNote}
                    key={uuid()}
                  >
                    Cancel
                  </Button>,
                  <Button
                    variant="outlined"
                    color="primary"
                    key={uuid()}
                    onClick={handleAddNoteSubmit}
                    disabled={!disableBtn}
                  >
                    Save
                  </Button>,
                ]}
              >
                <>
                  {/* <Grid>
                    <p className={classes.orderId}>Order ID: {orderId}</p>
                  </Grid> */}
                  <InputLabel id="demo-simple-select-label">
                    Issue Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className={classes.selectBox}
                    onChange={(event) => handleChange(event)}
                  >
                    {props.NoteListSuccess &&
                      props.noteListData !== null &&
                      props.noteListData.map((value, index) => {
                        if (selectedValue === value) {
                          return (
                            <MenuItem
                              value={value.id}
                              key={index}
                              selected={true}
                            >
                              {value.code}
                            </MenuItem>
                          );
                        } else {
                          return (
                            <MenuItem value={value.id} key={index}>
                              {value.code}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                  <TextField
                    id="outlined-multiline-static"
                    onChange={handleTextChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    margin="normal"
                    size="small"
                    placeholder="Add notes"
                  />
                </>
              </Dialog>
            )}
          </div>
        </div>
        {props.notesProgress && <Loading message="Fetching data..." />}
        <Box Box width="85%" mx="auto">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">NOTE NUMBER</TableCell>
                  <TableCell align="center">TYPE TYPE</TableCell>
                  <TableCell align="center">DESCRIPTION</TableCell>
                  <TableCell align="center">CREATED AT</TableCell>
                  <TableCell align="center">CREATED BY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data) => (
                      <TableRow>
                        <TableCell align="center">{data.order_id}</TableCell>
                        <TableCell align="center">{data.type}</TableCell>
                        <TableCell align="center">{data.notes}</TableCell>
                        <TableCell align="center">
                          {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                        </TableCell>
                        <TableCell align="center">{data.created_by}</TableCell>
                      </TableRow>
                    ))}
                {!showData && !props.notesFail && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
                {props.notesFail && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      -
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {showData && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Box>
        {props.notesFail && (
          <ErrorMsg show={true} message={props.errorMsg} type="error" />
        )}
        {props.createNotesSuccess && (
          <ErrorMsg show={true} message={props.successMsg} type="success" />
        )}
        {props.NoteListFailed && (
          <ErrorMsg show={true} message={props.errorMessage} type="error" />
        )}
      </div>
    </>
  );
}

Notes.propTypes = {
  customerNotes: PropTypes.object,
  fetchConsumerNotes: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  customerId: PropTypes.any,
  orderInfo: PropTypes.object,
  notesFail: PropTypes.bool,
  errorMsg: PropTypes.string,
  createNotes: PropTypes.func,
  successMsg: PropTypes.string,
  resetOnUnmount: PropTypes.func,
  createNotesSuccess: PropTypes.bool,
  NoteListSuccess: PropTypes.bool,
  noteListData: PropTypes.bool,
  fetchConsumerNotesList: PropTypes.func,
  NoteListFailed: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export { Notes };

const useStyles = makeStyles((theme) => ({
  row1: {
    display: "flex",
    justifyContent: "space-between",
    padding: "34px 24px",
    letterSpacing: "0.012em",
    fontSize: "16px",
    color: "#696969",
    fontWeight: "bold",
  },
  orderId: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)",
  },
  selectBox: {
    width: "100%",
  },
}));
