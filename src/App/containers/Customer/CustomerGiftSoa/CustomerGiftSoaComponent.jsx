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
}));

const createData = ({
  reference_number,
  transaction_type,
  transaction_amount,
  gift_cards_and_value,
  transaction_status,
  date_at_server,
}) => {
  return {
    reference_number,
    transaction_type,
    transaction_amount,
    gift_cards_and_value,
    transaction_status,
    date_at_server,
  };
};

function CustomerGiftSoa(props) {
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
      customer_contact_number: customerNumber,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchGiftSoaList(payload);
    return () => {
      props.resetOnUnmount();
    };
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.giftSoaSuccess) {
      if (props.giftSoaList.soa !== null) {
        loopData(props.giftSoaList.soa);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.giftSoaSuccess]);

  useEffect(() => {
    setErrorMessage(props.giftSoaFail);
  }, [props.giftSoaFail]);

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
        value={2}
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
      {props.giftSoaProgress && <Loading message="Fetching data..." />}
      <Box width="85%" mx="auto">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ORDER ID</TableCell>
                <TableCell align="center">TRANSACTION TYPE</TableCell>
                <TableCell align="center">TRANSACTION AMOUNT</TableCell>
                <TableCell align="center">CARD NUMBER AND VALUE</TableCell>
                <TableCell align="center">TRANSACTION STATUS</TableCell>
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
                        {data.reference_number}
                      </TableCell>
                      <TableCell align="center">
                        {data.transaction_type}
                      </TableCell>
                      <TableCell align="center">
                        {data.transaction_amount}
                      </TableCell>
                      <TableCell align="center">
                        {data.gift_cards_and_value}
                      </TableCell>
                      <TableCell align="center">
                        {data.transaction_status}
                      </TableCell>
                      <TableCell align="center">
                        {Moment(data.date_at_server).format(
                          "DD/MM/YYYY h:mm A"
                        )}
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
        {props.giftSoaSuccess && showData && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.giftSoaList.count}
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

CustomerGiftSoa.propTypes = {
  customerId: PropTypes.any,
  customerNumber: PropTypes.any,
  fetchGiftSoaList: PropTypes.func,
  giftSoaList: PropTypes.array,
  giftSoaSuccess: PropTypes.bool,
  giftSoa: PropTypes.bool,
  errorMsg: PropTypes.any,
  giftSoaFail: PropTypes.bool,
  giftSoaProgress: PropTypes.bool,
  resetOnUnmount: PropTypes.func,
};

export { CustomerGiftSoa };
