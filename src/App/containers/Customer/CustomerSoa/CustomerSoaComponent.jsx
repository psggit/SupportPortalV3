/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
//import Pagination from "../../../components/pagination";
import Notification from "../../../components/notification";
import Moment from "moment";
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
} from "../../../utils/helpers";
import { useHistory } from "react-router-dom";
//import Pagination from "@material-ui/lab/Pagination";

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
    padding: "0px 25px",
  },
}));

const soaTableHeaders = [
  { label: "ORDER ID", value: "order_id" },
  { label: "TYPE", value: "type" },
  { label: "AMOUNT", value: "amount" },
  { label: "OPENING BALANCE", value: "opening_balance" },
  { label: "CLOSING BALANCE", value: "closing_balance" },
  { label: "CREATED AT", value: "created_at" },
];

function CustomerSoa(props) {
  console.log("[CustomerSoa]", props);

  const history = useHistory();
  const classes = useStyles();

   const pageLimit = 20;
  // const activePage = getQueryParamByName("activePage") || 1;
  // const [isLoading, setLoading] = useState(false);
  // const [pageNo, setPageNo] = useState(activePage);
  // const [isError, setError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const payload = {
      consumer_id: props.customerId,
      limit: 10,
      offset: 0,
    };
    props.fetchCustomerSoaList(payload);
  }, []);

  // useEffect(() => {
  //   setErrorMessage("errrror");
  // }, []);
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

  // const handleClose = () => {
  //   setError(false);
  // };

  const handleCustomerDetail = () => {
    history.push("/customer-detail");
  };

  const handleGiftSoaChange = () => {
    console.log("gift-soa");
    history.push("/gift-soa");
  };

  const handleRewardChange = () => {
    console.log("rewards");
    history.push("/rewards");
  };

  const handleSoaChange = () => {
    console.log("soa");
    history.push("/soa");
  };

  const handleNotesChange = () => {
    history.push("/notes");
  };

  const handleBack = () => {
    history.push("/order-details");
  };

  let loading = props.soaProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div onClick={handleBack}>Back</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleCustomerDetail}>Customer Details</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleSoaChange}>SOA</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleGiftSoaChange}>Gift Soa</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleRewardChange}>Rewards</div>
        </div>
        <div className={classes.navContent}>
          <div onClick={handleNotesChange}>Notes</div>
        </div>
      </div>
      <div className={classes.row1}>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>Search</div>
      </div>
      <div className={classes.table}>
        <Table tableHeaders={soaTableHeaders}>
          {props.soaSuccess
            ? props.soaList.consumer_soa.map((data) => {
                return (
                  <TableRow>
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
              })
            : !props.soaSuccess && (
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
        {/* {props.soaSuccess && (
          <Pagination page={100} count={props.soaList.count} color="primary" />
        )} */}

        {/* {
          props.soaSuccess &&
          <Pagination
            activePage={parseInt(pageNo)}
            //itemsCountPerPage={parseInt(pageLimit)}
            rowsPerPage={parseInt(pageLimit)}
            count={props.soaList.consumer_soa.count}
            setPage={handlePageChange}
            color="primary"
          />
        } */}
        {/* { isError &&
          <Notification
            message={errorMessage}
            messageType="error"
            open={isError}
            handleClose={handleClose}
          />
        } */}
      </div>
    </div>
  );
  // }
}

CustomerSoa.propTypes = {
  soaList: PropTypes.array,
  CustomerSoaList: PropTypes.array,
  fetchCustomerSoaList: PropTypes.any,
  soaProgress: PropTypes.bool,
  soaSuccess: PropTypes.bool,
  customerId: PropTypes.any,
};

export { CustomerSoa };
