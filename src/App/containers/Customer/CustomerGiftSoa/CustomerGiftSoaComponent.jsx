/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Box, TablePagination } from "@material-ui/core";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import FullWidthTabs from "../customerMenuBar";
import {
  TableContainer,
  Table,
  Container,
  Tab,
  TableHead,
} from "@material-ui/core";
import Loading from "../../../components/loading";

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
  paper: {
    //padding: 24,
  },
}));

const createData = ({
  reference_number,
  transaction_type,
  transaction_amount,
  gift_cards_and_value,
  ResponseMessage,
  date_at_server,
}) => {
  return {
    reference_number,
    transaction_type,
    transaction_amount,
    gift_cards_and_value,
    ResponseMessage,
    date_at_server,
  };
};

function CustomerGiftSoa(props) {
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const payload = {
      customer_contact_number: props.customerNumber,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchGiftSoaList(payload);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.giftSoaSuccess) {
      if (props.giftSoaList !== null) {
        loopData(props.giftSoaList);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(props);

  let loading = props.giftSoaProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <TopBar />
      <FullWidthTabs value={2} orderId={props.orderInfo.order_id} />
      <div className={classes.row1}>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>Search</div>
      </div>
      <Box width="90%" mx="auto" mt={4}>
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
                rows.map((data) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <TableRow key={index}>
                      <TableCell>{data.reference_number}</TableCell>
                      <TableCell>{data.transaction_type}</TableCell>
                      <TableCell>{data.transaction_amount}</TableCell>
                      <TableCell>{data.gift_cards_and_value}</TableCell>
                      <TableCell>{data.ResponseMessage}</TableCell>
                      <TableCell align="left">
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
        </TableContainer>
      </Box>
    </>
  );
}

CustomerGiftSoa.propTypes = {
  customerId: PropTypes.any,
  fetchGiftSoaList: PropTypes.func,
  giftSoaList: PropTypes.array,
  giftSoaSuccess: PropTypes.bool,
  giftSoa: PropTypes.bool,
  errorMsg: PropTypes.any,
  giftSoaFail: PropTypes.bool,
  giftSoaProgress: PropTypes.bool,
};

export { CustomerGiftSoa };
