import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TopBar from "../../../components/topBar";
import Notification from "../../../components/notification";
import Moment from "moment";
import { getQueryParamByName } from "../../../utils/helpers";
import Paper from "@material-ui/core/Paper";
import FullWidthTabs from "../../../components/customerMenuBar";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import Loading from "../../../components/loading";

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
    padding: "0px 80px",
  },
  paper: {
    //padding: 24,
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
  const activePage = getQueryParamByName("activePage") || 1;
  // eslint-disable-next-line no-unused-vars
  const [pageNo, setPageNo] = useState(activePage);
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // page * rowsPerPage + rowsPerPage

  useEffect(() => {
    const payload = {
      consumer_id: props.customerId,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchCustomerSoaList(payload);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.soaSuccess) {
      if (props.soaList.consumer_soa !== null) {
        // console.clear();
        console.log(props.soaList.consumer_soa);
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

  let loading = props.soaProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs value={1} orderId={props.orderInfo.order_id} />
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
                        <TableCell>{data.order_id}</TableCell>
                        <TableCell>{data.type}</TableCell>
                        <TableCell>{data.amount}</TableCell>
                        <TableCell>{data.opening_balance}</TableCell>
                        <TableCell>{data.closing_balance}</TableCell>
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
                count={props.soaList.count}
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

CustomerSoa.propTypes = {
  soaList: PropTypes.array,
  orderInfo: PropTypes.object,
  CustomerSoaList: PropTypes.array,
  fetchCustomerSoaList: PropTypes.any,
  soaProgress: PropTypes.bool,
  soaSuccess: PropTypes.bool,
  soaFail: PropTypes.bool,
  customerId: PropTypes.any,
  errorMsg: PropTypes.any,
};

export { CustomerSoa };
