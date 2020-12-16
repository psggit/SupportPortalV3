import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Box, TablePagination } from "@material-ui/core";
import Notification from "../../../components/notification";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import FullWidthTabs from "../customerMenuBar";
import { Typography } from "@material-ui/core";
import { TableContainer, Table, TableHead } from "@material-ui/core";
import Loading from "../../../components/loading";

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
  giftCell: {
    maxWidth: 200,
    wordBreak: "break-word",
  },
}));

const createData = ({
  transaction_type,
  transaction_amount,
  transaction_message,
  created_at,
}) => {
  return {
    transaction_type,
    transaction_amount,
    transaction_message,
    created_at,
  };
};

function HipcoinSoa(props) {
  const classes = useStyles();
  const history = useHistory();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const customerNumber = history.location.state.customerNumber;
  const orderInfos = history.location.state.orderInfos;

  useEffect(() => {
    const payload = {
      consumer_id: history.location.state.customerId,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchHipcoinSoaList(payload);
    return () => {
      props.resetOnUnmount();
    };
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.hipcoinSoaSuccess) {
      if (props.hipcoinSoaList.soa !== null) {
        loopData(props.hipcoinSoaList.soa);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.hipcoinSoaSuccess]);

  useEffect(() => {
    setErrorMessage(props.hipcoinSoaFail);
  }, [props.hipcoinSoaFail]);

  const handleClose = () => {
    setErrorMessage(false);
  };

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
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <TopBar />
      <FullWidthTabs
        value={
          localStorage.getItem("x-hasura-role") !== "support_person" ? 3 : 2
        }
        orderId={history.location.state.orderId}
        customerId={history.location.state.customerId}
        customerNumber={customerNumber}
        orderInfos={orderInfos}
      />
      <div className={classes.row1}>
        <Typography>
          <p>CUSTOMER ID: {history.location.state.customerId}</p>
        </Typography>
        {/* <div>Search</div> */}
      </div>
      {props.hipcoinSoaProgress && <Loading message="Fetching data..." />}
      <Box width="85%" mx="auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">TRANSACTION TYPE</TableCell>
                <TableCell align="center">TRANSACTION AMOUNT</TableCell>
                <TableCell align="center">TRANSACTION MESSAGE</TableCell>
                <TableCell align="center">CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showData &&
                rows.map((data, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow key={index}>
                      <TableCell align="center">
                        {data.transaction_type}
                      </TableCell>
                      <TableCell align="center">
                        {data.transaction_amount}
                      </TableCell>
                      <TableCell align="center">
                        {data.transaction_message}
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
        {props.hipcoinSoaSuccess && showData && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.hipcoinSoaList.count}
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
    </>
  );
}

HipcoinSoa.propTypes = {
  customerId: PropTypes.any,
  customerNumber: PropTypes.any,
  fetchHipcoinSoaList: PropTypes.func,
  hipcoinSoaList: PropTypes.array,
  hipcoinSoaSuccess: PropTypes.bool,
  giftSoa: PropTypes.bool,
  errorMsg: PropTypes.any,
  hipcoinSoaFail: PropTypes.bool,
  hipcoinSoaProgress: PropTypes.bool,
  resetOnUnmount: PropTypes.func,
};

export { HipcoinSoa };
