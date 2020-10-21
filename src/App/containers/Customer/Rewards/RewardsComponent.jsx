/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import Pagination from "../../../components/pagination";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import HorizontalBar from "./../horizontalBar";

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
}));

const tableHeaders = [
  { label: "ORDER ID", value: "order_id" },
  { label: "RETAILER NAME", value: "retailer_name" },
  { label: "REWARD ID", value: "reward_id" },
  { label: "REWARD SOURCE", value: "reward_source" },
  { label: "AMOUNT", value: "amount" },
  { label: "PROMOCODE", value: "promocode" },
  { label: "BANK RRN", value: "bank_rrn" },
  { label: "FAILURE REASON", value: "failure_reason" },
  { label: "CREATED AT", value: "created_at" },
  { label: "STATUS", value: "status" },
];

function Rewards(props) {
  console.log("[rewards]", props.customerId);
  const classes = useStyles();

  // const pageLimit = 2;
  // const activePage = getQueryParamByName("activePage") || 1;
  // const [isLoading, setLoading] = useState(false);
  // const [pageNo, setPageNo] = useState(activePage);

  useEffect(() => {
    const payload = {
      consumer_id: parseInt(props.customerId),
      limit: 10,
      offset: 0,
    };
    props.fetchRewardsList(payload);
  }, []);

  // const handlePageChange = (pageObj) => {
  //   setPageNo(pageObj.activePage);
  //   const queryParamsObj = {
  //     activePage: pageObj.activePage,
  //   };
  //   history.pushState(
  //     queryParamsObj,
  //     "soa listing",
  //     `/soa ${getQueryUri(queryParamsObj)}`
  //   );
  // };

  let loading = props.rewardsProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.formContainer}>
      <HorizontalBar />
      <div className={classes.row1}>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>Search</div>
      </div>
      <div className={classes.table}>
        <Paper className={classes.paper}>
          <Table tableHeaders={tableHeaders}>
            {props.rewardsSuccess
              ? props.rewardsList.rewards.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{data.order_id}</TableCell>
                      <TableCell>{data.retailer_name}</TableCell>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.reward_source}</TableCell>
                      <TableCell>{data.amount}</TableCell>
                      <TableCell>{data.promo_code}</TableCell>
                      <TableCell>{data.bank_rrn}</TableCell>
                      <TableCell>{data.failure_reason}</TableCell>
                      <TableCell align="left">
                        {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                      </TableCell>
                      <TableCell>{data.status}</TableCell>
                    </TableRow>
                  );
                })
              : props.rewardsSuccess &&
                props.rewardsList.rewards.length == null && (
                  <tr>
                    <td
                      style={{ textAlign: "center", padding: "10px 0" }}
                      colSpan="6"
                    >
                      <p style={{ fontWeight: "16px" }}>No records found</p>
                    </td>
                  </tr>
                )}
          </Table>
        </Paper>
      </div>
    </div>
  );
}

Rewards.propTypes = {
  rewardsList: PropTypes.object,
  rewardsProgress: PropTypes.bool,
  rewardsSuccess: PropTypes.bool,
  customerId: PropTypes.any,
  fetchRewardsList: PropTypes.func,
};

export { Rewards };
