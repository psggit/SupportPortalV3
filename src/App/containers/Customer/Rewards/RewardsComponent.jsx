import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TopBar from "../../../components/topBar";
import Notification from "../../../components/notification";
import Moment from "moment";
import { getQueryParamByName } from "../../../utils/helpers";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import FullWidthTabs from "../../../components/customerMenuBar";
import {
  Table,
  Container,
  Box,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
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
  order_id,
  retailer_name,
  reward_id,
  reward_source,
  amount,
  promocode,
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
    promocode,
    bank_rrn,
    failure_reason,
    created_at,
    status,
  };
};

function Rewards(props) {
  useEffect(() => {
    const payload = {
      consumer_id: parseInt(props.customerId),
      limit: 10,
      offset: 0,
    };
    console.log("payload", payload);
    props.fetchRewardsList(payload);
  }, []);

  const classes = useStyles();
  const pageLimit = 10;
  const activePage = getQueryParamByName("activePage") || 1;
  const [pageNo, setPageNo] = useState(activePage);
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (props.rewardsSuccess) {
      if (props.rewardsList.rewards !== null && props.rewardsList.rewards > 0) {
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

  let loading = props.rewardsProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs value={3} orderId={props.orderInfo.order_id} />
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
                          <TableCell>{data.order_id}</TableCell>
                          <TableCell>{data.retailer_name}</TableCell>
                          <TableCell>{data.id}</TableCell>
                          <TableCell>{data.reward_source}</TableCell>
                          <TableCell>{data.amount}</TableCell>
                          <TableCell>{data.promo_code}</TableCell>
                          <TableCell>{data.bank_rrn}</TableCell>
                          <TableCell>{data.failure_reason}</TableCell>
                          <TableCell align="left">
                            {Moment(data.created_at).format(
                              "DD/MM/YYYY h:mm A"
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                {!showData && (
                  <TableRow>
                    <TableCell colSpan={10} align="center">No data available</TableCell>
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
  soaList: PropTypes.array,
  orderInfo: PropTypes.object,
  rewardsList: PropTypes.array,
  rewardsProgress: PropTypes.bool,
  rewardsSuccess: PropTypes.bool,
  rewardsFail: PropTypes.bool,
  customerId: PropTypes.any,
  fetchRewardsList: PropTypes.func,
  errorMsg: PropTypes.string,
};

export { Rewards };
