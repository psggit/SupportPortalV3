/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "../../components/dialog";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../components/topBar";
import FullWidthTabs from "../../components/menuBar";
import Notification from "../../components/notification";
import { Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
  Grid,
} from "@material-ui/core";

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showData, setShowData] = useState(false);
  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [age, setAge] = useState("");

  useEffect(() => {
    props.fetchDeliveryAgentNotes(props.orderInfo.order_id);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.fetchSuccess) {
      if (props.deliveryAgentNotes.orderNotes !== null) {
        loopData(props.deliveryAgentNotes.orderNotes);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.fetchSuccess]);

  useEffect(() => {
    setErrorMessage(props.fetchFail);
  }, [props.fetchFail]);

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

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  const handleClose = () => {
    setErrorMessage(false);
  };

  const handleBack = () => {
    history.push(`/order-info/${props.orderInfo.order_id}`);
  };

  const menuLabels = [
    <Tab
      label={
        <Button color="primary" startIcon={<KeyboardBackspaceIcon />}>
          {" "}
          Back{" "}
        </Button>
      }
      onClick={handleBack}
    />,
    <Tab label={<Button color="primary">Notes</Button>} />,
  ];

  let loading = props.fetchProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          labels={menuLabels}
          className={classes.horizontalBar}
          value={1}
        />
        ;
        <div className={classes.row1}>
          <p>CUSTOMER ID: {props.orderInfo.customer_id}</p>
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
                    key="cancelBtn"
                  >
                    Cancel
                  </Button>,
                  <Button
                    variant="outlined"
                    color="primary"
                    key="saveBtn"
                    //onClick={commentUnmountModel}
                  >
                    Save
                  </Button>,
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
                          inputProps={{ "aria-label": "Without label" }}
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
            )}
          </div>
        </div>
        <Box width="90%" mx="auto" mt={4}>
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
                  rows.map((data, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell align="center">{data.order_id}</TableCell>
                        <TableCell align="center">{data.type}</TableCell>
                        <TableCell align="center">{data.notes}</TableCell>
                        <TableCell align="center">
                          {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                        </TableCell>
                        <TableCell align="center">{data.created_by}</TableCell>
                      </TableRow>
                    );
                  })}
                {!showData && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {showData && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={10}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        </Box>
        {errorMessage && (
          <Notification
            message={props.errorMsg}
            messageType="error"
            open={errorMessage}
            handleClose={handleClose}
          />
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
  deliveryAgentNotes: PropTypes.array,
  errorMsg: PropTypes.bool,
};

export { DaNotes };

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "24px",
    color: "#696969",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "21px",
  },
  navContent: {
    marginLeft: "22px",
  },
  row1: {
    display: "flex",
    justifyContent: "space-between",
    padding: "34px 24px",
    letterSpacing: "0.012em",
    fontSize: "16px",
    color: "#696969",
    fontWeight: "bold",
  },
  table: {
    padding: "0px 80px",
  },
  formRoot: {
    padding: 24,
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10,
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060",
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
  horizontalBar: {
    backgroundColor: "#FFFFFF",
  }
}));
