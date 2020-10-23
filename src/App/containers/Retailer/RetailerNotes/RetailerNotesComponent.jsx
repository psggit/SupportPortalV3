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
import Notification from "../../../components/notification";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
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
    padding: "0px 25px",
  },
  root: {
    paddingBottom: "5px",
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
  console.log("[RetailerNotesComponent]", props);
  const classes = useStyles();
  const history = useHistory();

  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [showData, setShowData] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const payload = {
      order_id: props.orderId.order_id,
      type: "retailer",
    };
    props.fetchRetailerNotesList(payload);
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

  useEffect(() => {
    setErrorMessage(props.notesFail);
  }, [props.notesFail]);

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
    history.push(`/order-info/${props.orderId.order_id}`);
  };

  const handleClose = () => {
    setErrorMessage(false);
  };

  let loading = props.notesProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

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
          <p>CUSTOMER ID: {props.orderInfo.customer_id}</p>
          <div>
            <Button variant="contained" color="primary">
              Add Note
            </Button>
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

RetailerNotesComponent.propTypes = {
  notesList: PropTypes.object,
  fetchRetailerNotesList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  notesFail: PropTypes.bool,
  errorMsg: propTypes.any,
  orderId: PropTypes.any,
};

export { RetailerNotesComponent };
