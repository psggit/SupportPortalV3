/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "../../../components/pagination";
import Moment from "moment";
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
} from "../../../utils/helpers";

const useStyles = makeStyles(theme => ({
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
    padding: "0px 25px",
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
  console.log("props..hy", props.rewardsList.data, props.rewardsList.count);
  const classes = useStyles();

  const pageLimit = 2;
  const activePage = getQueryParamByName("activePage") || 1;
  const [isLoading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(activePage);

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage);
    const queryParamsObj = {
      activePage: pageObj.activePage,
    };
    history.pushState(
      queryParamsObj,
      "soa listing",
      `/soa/123${getQueryUri(queryParamsObj)}`
    );
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div>SOA</div>
        </div>
        <div className={classes.navContent}>
          <div>Gift Soa</div>
        </div>
        <div className={classes.navContent}>
          <div>Rewards</div>
        </div>
        <div className={classes.navContent}>
          <div>Notes</div>
        </div>
      </div>
      <div className={classes.row1}>
        <p>CUSTOMER ID: 123</p>
        <div>Search</div>
      </div>
      <div className={classes.table}>
        <Table tableHeaders={tableHeaders}>
          {props.rewardsList.data.map((data, index) => {
            return (
              <TableRow>
                <TableCell>{data.order_id}</TableCell>
                <TableCell>{data.retailer_name}</TableCell>
                <TableCell>{data.reward_id}</TableCell>
                <TableCell>{data.reward_source}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>{data.promocode}</TableCell>
                <TableCell>{data.bank_rrn}</TableCell>
                <TableCell>{data.failure_reason}</TableCell>
                <TableCell align="left">
                  {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                </TableCell>
                <TableCell>{data.status}</TableCell>
              </TableRow>
            );
          })}
        </Table>
        <Pagination
          activePage={parseInt(pageNo)}
          //itemsCountPerPage={parseInt(pageLimit)}
          rowsPerPage={parseInt(pageLimit)}
          count={props.rewardsList.count}
          setPage={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
}

export { Rewards };
