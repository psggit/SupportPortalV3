/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import Loading from "../../../components/loading";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import Dialog from "../../../components/dialog";
import TextField from "@material-ui/core/TextField";
import ErrorMsg from "../../../components/errorMsg";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
  Grid,
  Tabs,
} from "@material-ui/core";
import { Tab } from "@material-ui/core";
import { propTypes } from "react-bootstrap/esm/Image";

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
  root: {
    paddingBottom: "5px",
  },
  orderId: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

const createData = ({ order_id, type, notes, created_at, created_by }) => {
  return {
    order_id,
    type,
    notes,
    created_at,
    created_by,
  };
};

function RetailerNotesComponent(props) {
  const classes = useStyles();

  const history = useHistory();
  const orderId = history.location.state.orderId;
  const customerId = history.location.state.customerId;
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [showData, setShowData] = useState(false);
  const [value, setValue] = React.useState(0);
  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [noteData, setNoteData] = useState("");

  const fetchNotes = () => {
    const payload = {
      order_id: orderId,
      type: "retailer",
    };
    props.fetchRetailerNotesList(payload);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (props.notesSuccess) {
      if (props.notesList.orderNotes !== null) {
        loopData(props.notesList.orderNotes);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.notesSuccess]);

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(data);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleBack = () => {
    history.push(`/order-info/${orderId}`);
  };

  const handleTextChange = (e) => {
    setNoteData(e.target.value);
  };
  const mountAddNote = () => {
    setShowAddNoteDialog(true);
  };
  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };
  const handleAddNoteSubmit = () => {
    let payload = {
      order_id: orderId,
      type: "retailer",
      notes: noteData,
    };
    props.createNotes(payload);
    fetchNotes();
    setShowAddNoteDialog(false);
  };

  return (
    <>
      <div className={classes.formContainer}>
        <TopBar />
        <Paper className={classes.root}>
          <Grid alignItems="center" container>
            <Grid item xs={1}>
              <Button
                color="primary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Tabs
                value={value}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label={<Button color="primary">Notes</Button>} />,
              </Tabs>
            </Grid>
          </Grid>
        </Paper>
        <div className={classes.row1}>
          <p>CUSTOMER ID: {customerId}</p>
          <div>
            <Button variant="contained" color="primary" onClick={mountAddNote}>
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
                    key="cancelBtn"
                  >
                    Cancel
                  </Button>,
                  <Button
                    variant="outlined"
                    color="primary"
                    key="saveBtn"
                    onClick={handleAddNoteSubmit}
                  >
                    Save
                  </Button>,
                ]}
              >
                <>
                  <Grid>
                    <p className={classes.orderId}>Order ID: {orderId}</p>
                  </Grid>
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
                {!showData && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {props.notesSuccess && showData && (
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
        {props.createNotesFailure && (
          <ErrorMsg message={props.errorMsg} show={true} type={"error"} />
        )}
        {props.createNotesSuccess && (
          <ErrorMsg message={props.successMsg} show={true} type={"success"} />
        )}
      </div>
    </>
  );
}

RetailerNotesComponent.propTypes = {
  notesList: PropTypes.object,
  fetchRetailerNotesList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  notesFail: PropTypes.bool,
  errorMsg: propTypes.any,
  orderId: PropTypes.any,
  createNotes: PropTypes.func,
  createNotesSuccess: PropTypes.bool,
  createNotesFailure: PropTypes.bool,
  successMsg: PropTypes.any,
};

export { RetailerNotesComponent };
