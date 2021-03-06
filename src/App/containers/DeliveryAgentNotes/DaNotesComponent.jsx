/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "../../components/dialog";
import TopBar from "../../components/topBar";
import { Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading";
import { Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import ErrorMsg from "../../components/errorMsg";
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

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

const createData = ({ order_id, type, notes, created_at, created_by }) => {
  return {
    order_id,
    type,
    notes,
    created_at,
    created_by,
  };
};

function DaNotes(props) {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [showData, setShowData] = useState(false);
  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [value, setValue] = React.useState(0);
  const [selectedValue, setSelectedValue] = useState("");
  const [noteData, setNoteData] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const customerId = history.location.state.customerId;
  const orderId = history.location.state.orderId;

  const fetchNote = () => {
    if (localStorage.getItem("x-hasura-role") !== "ops_delivery_manager") {
      props.fetchDeliveryAgentNotes(orderId);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  useEffect(() => {
    if (props.fetchSuccess) {
      if (props.deliveryAgentNotes.orderNotes !== null) {
        loopData(props.deliveryAgentNotes.orderNotes);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
    return () => {
      props.resetOnUnmount();
    };
  }, [props.fetchSuccess]);

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
    setDisableBtn(false);
    if (e.target.value.trim().length > 0) {
      setDisableBtn(true);
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
    props.fetchDaIssueList();
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  const handleAddNoteSubmit = () => {
    let payload = {
      order_id: orderId,
      type: "delivery_agent",
      notes: noteData,
      da_note_type: parseInt(selectedValue),
    };
    props.createNotes(payload);
    fetchNote();
    setShowAddNoteDialog(false);
  };

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
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
                    {props.fetchDaIssueListSuccess &&
                      props.daIssueList !== null &&
                      props.daIssueList.map((value, index) => {
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
        {props.fetchProgress && <Loading message="Fetching data..." />}
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
        {props.createNotesSuccess && (
          <ErrorMsg show={true} message={props.successMsg} type="success" />
        )}
        {props.fetchFailed && (
          <ErrorMsg show={true} message={props.errorMsg} type="error" />
        )}
      </div>
    </>
  );
}

DaNotes.propTypes = {
  customerId: PropTypes.any,
  orderInfo: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
  fetchDeliveryAgentNotes: PropTypes.func,
  deliveryAgentNotes: PropTypes.object,
  errorMsg: PropTypes.string,
  fetchFailed: PropTypes.bool,
  createNotes: PropTypes.func,
  resetOnUnmount: PropTypes.func,
  successMsg: PropTypes.string,
  createNotesSuccess: PropTypes.bool,
  fetchDaIssueListSuccess: PropTypes.bool,
  daIssueList: PropTypes.any,
  fetchDaIssueList: PropTypes.func,
};

export { DaNotes };

const useStyles = makeStyles(() => ({
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
    cursor: "pointer",
    alignItems: "center",
    paddingBottom: "5px",
  },
  orderId: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)",
  },
  selectBox: {
    width: "100%",
  },
}));
