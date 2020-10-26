import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TopBar from "../../../components/topBar";
import Notification from "../../../components/notification";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import FullWidthTabs from "../customerMenuBar";
import Loading from "../../../components/loading";
import { useHistory } from "react-router-dom";

import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
} from "@material-ui/core";

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
}));

const createData = ({
  order_id,
  type,
  amount,
  opening_balance,
  closing_balance,
  created_at,
}) => {
  return {
    order_id,
    type,
    amount,
    opening_balance,
    closing_balance,
    created_at,
  };
};

function CustomerSoa(props) {
  const classes = useStyles();
  const history = useHistory();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const payload = {
      consumer_id: history.location.state.customerId,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchCustomerSoaList(payload);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.soaSuccess) {
      if (props.soaList.consumer_soa !== null) {
        loopData(props.soaList.consumer_soa);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.soaSuccess]);

  useEffect(() => {
    setErrorMessage(props.soaFail);
  }, [props.soaFail]);

  const handleClose = () => {
    setErrorMessage(false);
  };

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

  console.log("from soa", history.location.state.customerId)

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={1}
          orderId={history.location.state.orderId}
          customerId={history.location.state.customerId}
        />
        <div className={classes.row1}>
          <p>CUSTOMER ID: {history.location.state.customerId}</p>
          <div>Search</div>
        </div>
        {props.soaProgress && <Loading message="Fetching data..." />}
        <Box width="85%" mx="auto">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ORDER ID</TableCell>
                  <TableCell align="center">TYPE</TableCell>
                  <TableCell align="center">AMOUNT</TableCell>
                  <TableCell align="center">OPENING BALANCE</TableCell>
                  <TableCell align="center">CLOSING BALANCE</TableCell>
                  <TableCell align="center">CREATED AT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData &&
                  rows.map((data, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell align="center">{data.order_id}</TableCell>
                        <TableCell align="center">{data.type}</TableCell>
                        <TableCell align="center">{data.amount}</TableCell>
                        <TableCell align="center">
                          {data.opening_balance}
                        </TableCell>
                        <TableCell align="center">
                          {data.closing_balance}
                        </TableCell>
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
          </TableContainer>
          {showData && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.soaList.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
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

CustomerSoa.propTypes = {
  soaList: PropTypes.object,
  orderInfo: PropTypes.object,
  CustomerSoaList: PropTypes.object,
  fetchCustomerSoaList: PropTypes.any,
  soaProgress: PropTypes.bool,
  soaSuccess: PropTypes.bool,
  soaFail: PropTypes.bool,
  customerId: PropTypes.any,
  errorMsg: PropTypes.any,
};

export { CustomerSoa };
