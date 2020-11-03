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
// import SearchIcon from "@material-ui/icons/Search";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import InputBase from "@material-ui/core/InputBase";
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
  search: {
    position: "relative",
  },
  searchIcon: {
    padding: "2px",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#C7C7C7",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    border: "1px solid #C7C7C7",
    paddingLeft: "30px",
    width: "50%",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginLeft: "-83px",
    width: "80%",
    border: "1px solid #C7C7C7",
    backgroundColor: "#E5E5E5",
  },
  design: {
    display: "flex",
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
  const customerId = history.location.state.customerId;
  const orderId = history.location.state.orderId;
  const customerNumber = history.location.state.customerNumber;
  const orderInfos = history.location.state.orderInfos;
  // const [age, setAge] = React.useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  useEffect(() => {
    const payload = {
      consumer_id: customerId,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchCustomerSoaList(payload);
    return () => {
      props.resetOnUnmount();
    };
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

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={1}
          orderId={orderId}
          customerId={customerId}
          customerNumber={customerNumber}
          orderInfos={orderInfos}
        />
        <div className={classes.row1}>
          <p>CUSTOMER ID: {customerId}</p>
          {/* <div>
            <div className={classes.design}>
              <div>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search here"
                    classes={{
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </div>
              <FormControl className={classes.formControl}>
                <Select
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>Order ID</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div> */}
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
          {props.soaSuccess && showData && (
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
            message={props.errorMsg.message}
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
  resetOnUnmount: PropTypes.func,
};

export { CustomerSoa };
