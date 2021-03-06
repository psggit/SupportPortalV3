import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TopBar from "../../../components/topBar";
import Notification from "../../../components/notification";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import FullWidthTabs from "../customerMenuBar";
import {
  Table,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
  Typography,
} from "@material-ui/core";
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
  order_id,
  retailer_name,
  reward_id,
  reward_source,
  amount,
  promo_code,
  bank_rrn,
  failure_reason,
  created_at,
  status,
}) => {
  return {
    order_id,
    retailer_name,
    reward_id,
    reward_source,
    amount,
    promo_code,
    bank_rrn,
    failure_reason,
    created_at,
    status,
  };
};

function Rewards(props) {
  const classes = useStyles();
  const history = useHistory();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const customerId = history.location.state.customerId;
  const orderId = history.location.state.orderId;
  const customerNumber = history.location.state.customerNumber;
  const orderInfos = history.location.state.orderInfos;

  useEffect(() => {
    const payload = {
      consumer_id: parseInt(customerId),
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchRewardsList(payload);
    return () => {
      props.resetOnUnmount();
    };
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.rewardsSuccess) {
      if (
        props.rewardsList.rewards !== null &&
        props.rewardsList.rewards.length > 0
      ) {
        loopData(props.rewardsList.rewards);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [props.rewardsSuccess]);

  useEffect(() => {
    setErrorMessage(props.rewardsFail);
  }, [props.rewardsFail]);

  const handleClose = () => {
    setErrorMessage(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(data);
  };

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={4}
          orderId={orderId}
          customerId={customerId}
          customerNumber={customerNumber}
          orderInfos={orderInfos}
        />
        <div className={classes.row1}>
          <Typography>
            <p>CUSTOMER ID: {customerId}</p>
          </Typography>
          {/* <div>Search</div> */}
        </div>
        {props.rewardsProgress && <Loading message="Fetching data..." />}
        <Box width="85%" mx="auto">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ORDER ID</TableCell>
                  <TableCell align="center">RETAILER NAME</TableCell>
                  <TableCell align="center">REWARD ID</TableCell>
                  <TableCell align="center">REWARD SOURCE</TableCell>
                  <TableCell align="center">AMOUNT</TableCell>
                  <TableCell align="center">PROMOCODE</TableCell>
                  <TableCell align="center">BANK RRN</TableCell>
                  <TableCell align="center">FAILURE REASON</TableCell>
                  <TableCell align="center">CREATED AT</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((data, ind) => {
                      return (
                        <TableRow key={ind}>
                          <TableCell align="center">{data.order_id}</TableCell>
                          <TableCell align="center">
                            {data.retailer_name}
                          </TableCell>
                          <TableCell align="center">{data.id}</TableCell>
                          <TableCell align="center">
                            {data.reward_source}
                          </TableCell>
                          <TableCell align="center">{data.amount}</TableCell>
                          <TableCell align="center">
                            {data.promo_code}
                          </TableCell>
                          <TableCell align="center">{data.bank_rrn}</TableCell>
                          <TableCell align="center">
                            {data.failure_reason}
                          </TableCell>
                          <TableCell align="center">
                            {Moment(data.created_at).format(
                              "DD/MM/YYYY h:mm A"
                            )}
                          </TableCell>
                          <TableCell align="center">{data.status}</TableCell>
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
          {props.rewardsSuccess && showData && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.rewardsList.count}
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

Rewards.propTypes = {
  rewardsList: PropTypes.object,
  soaList: PropTypes.array,
  orderInfo: PropTypes.object,
  rewardsProgress: PropTypes.bool,
  rewardsSuccess: PropTypes.bool,
  rewardsFail: PropTypes.bool,
  customerId: PropTypes.any,
  fetchRewardsList: PropTypes.func,
  errorMsg: PropTypes.any,
  resetOnUnmount: PropTypes.func,
};

export { Rewards };
