import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Box, TablePagination } from "@material-ui/core";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import FullWidthTabs from "../../../components/menuBar";
import {
  TableContainer,
  Table,
  Container,
  Tab,
  TableHead,
} from "@material-ui/core";
import Loading from "../../../components/loading";

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
  const history = useHistory();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const payload = {
      customer_contact_number: props.customerNumber,
      limit: 10,
      offset: 0,
    };
    props.fetchGiftSoaList(payload);
  }, []);

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
      <Box>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>Search</div>
      </Box>
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
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <TableRow>
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
        {!showData && (
          <Container>
            <p>No data available</p>
          </Container>
        )}
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
