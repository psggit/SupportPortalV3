import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import Moment from "moment";
import Loading from "../../components/loading";
import TopBar from "../../components/topBar";
import SimpleMenuBar from "../../components/simpleMenuBar";

const useStyles = makeStyles(() => ({
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
}));

const createData = ({ created_by, notes, created_at }) => {
  return {
    created_by,
    notes,
    created_at,
  };
};

function ActivityListComponent(props) {
  console.log("[ActivityListComponent]", props);
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const reqBody = {
      order_id: `${props.orderId.orderDetails.order_id}`,
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
      if (props.acitivityLog.activityLogs.activity_details.activity !== null) {
        loopData(props.acitivityLog.activityLogs.activity_details.activity);
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

  let loading = props.notesProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <div className={classes.formContainer}>
      <TopBar />
      <SimpleMenuBar orderId={props.orderId}>
        {props.notesSuccess && <p>ACTIVITY LOGS-ORDER ID: {props.orderId}</p>}
      </SimpleMenuBar>
      <Box className={classes.table} mt={4}>
        <TableContainer className={classes.TableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">SUPPORT PERSON</TableCell>
                <TableCell align="center">NOTE</TableCell>
                <TableCell align="center">CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.notesSuccess &&
                rows &&
                rows.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{data.created_by}</TableCell>
                      <TableCell>{data.notes}</TableCell>
                      <TableCell align="left">
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
              count={props.acitivityLog.activityLogs.activity_details.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Box>
    </div>
  );
  // }
}

ActivityListComponent.propTypes = {
  acitivityLog: PropTypes.object,
  fetchActLogsList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  orderId: PropTypes.any,
};

export { ActivityListComponent };
