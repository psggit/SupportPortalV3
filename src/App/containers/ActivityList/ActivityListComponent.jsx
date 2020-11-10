import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  Box,
  Typography,
} from "@material-ui/core";
import Moment from "moment";
import Loading from "../../components/loading";
import TopBar from "../../components/topBar";
import SimpleMenuBar from "../../components/simpleMenuBar";
import ErrorMsg from "../../components/errorMsg";

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
  tableRow: {
    background: theme.palette.background.paper,
  },
}));

const createData = ({ created_by, notes, created_at, description }) => {
  return {
    created_by,
    notes,
    created_at,
    description,
  };
};

function ActivityListComponent(props) {
  // console.log("[ActivityListComponent]", prop);
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  let orderId = history.location.state.orderId;
  // console.log(orderId);

  useEffect(() => {
    // console.log(orderId);
    const reqBody = {
      order_id: `${orderId}`,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    // const reqBody = {
    //   order_id: "50011546022614",
    //   limit: rowsPerPage,
    //   offset: page * rowsPerPage,
    // };
    props.fetchActLogsList(reqBody);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.notesSuccess) {
      if (props.acitivityLog.activityLogs !== null) {
        loopData(props.acitivityLog.activityLogs.activity_logs);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [page, props.notesSuccess]);

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(filledRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.formContainer}>
      <TopBar />
      <SimpleMenuBar orderId={orderId}>
        <Typography>
          {props.notesSuccess && <p>ACTIVITY LOGS-ORDER ID: {orderId}</p>}
        </Typography>
      </SimpleMenuBar>
      {props.notesProgress && <Loading message="Fetching data..." />}
      <Box className={classes.table} mt={4}>
        <TableContainer className={classes.TableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ACTION BY</TableCell>
                <TableCell align="center">NOTE</TableCell>
                <TableCell align="center">DESCRIPTION</TableCell>
                <TableCell align="center">CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.notesSuccess &&
                rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data, index) => {
                    return (
                      <TableRow key={index} className={classes.tableRow}>
                        <TableCell align="center">{data.created_by}</TableCell>
                        <TableCell align="center">{data.notes}</TableCell>
                        <TableCell align="center">{data.description}</TableCell>
                        <TableCell align="center">
                          {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                        </TableCell>
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
              count={props.acitivityLog.activityLogs.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Box>
      {props.notesFail && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
    </div>
  );
  // }
}

ActivityListComponent.propTypes = {
  acitivityLog: PropTypes.object,
  fetchActLogsList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  orderData: PropTypes.any,
  errorMsg: PropTypes.string,
  notesFail: PropTypes.bool,
};

export { ActivityListComponent };
