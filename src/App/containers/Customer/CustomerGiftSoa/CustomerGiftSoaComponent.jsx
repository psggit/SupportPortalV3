import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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
import { useHistory } from "react-router-dom";
import { CustomerSoaContainer } from "../CustomerSoa/CustomerSoaContainer";

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

const tableHeaders = [
  { label: "ORDER ID", value: "order_id" },
  { label: "TRANSACTION TYPE", value: "transaction_type" },
  { label: "TRANSACTION AMOUNT", value: "transaction_amount" },
  { label: "CARD NUMBER AND VALUE", value: "card_number_and_value" },
  { label: "TRANSACTION STATUS", value: "transaction_status" },
  { label: "CREATED AT", value: "created_at" },
];

function CustomerGiftSoa(props) {

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    const payload = {
      customer_contact_number: "9533285566",
      limit: 10,
      offset: 0,
    };
    props.fetchGiftSoaList(payload);
  }, []);

  // const pageLimit = 2;
  // const activePage = getQueryParamByName("activePage") || 1;
  // const [isLoading, setLoading] = useState(false);
  // const [pageNo, setPageNo] = useState(activePage);

  // const handlePageChange = (pageObj) => {
  //   setPageNo(pageObj.activePage);
  //   const queryParamsObj = {
  //     activePage: pageObj.activePage,
  //   };
  //   history.pushState(
  //     queryParamsObj,
  //     "soa listing",
  //     `/soa${getQueryUri(queryParamsObj)}`
  //   );
  // };

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

  const handleBack = () => {
    history.push("/order-details");
  };

  const handleNotes = () => {
    history.push("/notes");
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div onClick={handleBack}>Back</div>
        </div>
        <div className={classes.navContent}>
          <div>Customer Details</div>
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
          <div onClick={handleNotes}>Notes</div>
        </div>
      </div>
      <div className={classes.row1}>
        <p>CUSTOMER ID: {props.customerId}</p>
        <div>Search</div>
      </div>
      <div className={classes.table}>
        <Table tableHeaders={tableHeaders}>
          {props.CustomerGiftSoaList.data.map((data, index) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <TableRow>
                <TableCell>{data.order_id}</TableCell>
                <TableCell>{data.transaction_type}</TableCell>
                <TableCell>{data.transaction_amount}</TableCell>
                <TableCell>{data.card_number_and_value}</TableCell>
                <TableCell>{data.transaction_status}</TableCell>
                <TableCell align="left">
                  {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
        {/* <Pagination
          activePage={parseInt(pageNo)}
          //itemsCountPerPage={parseInt(pageLimit)}
          rowsPerPage={parseInt(pageLimit)}
          count={props.CustomerGiftSoaList.count}
          setPage={handlePageChange}
          color="primary"
        /> */}
      </div>
    </div>
  );
}

CustomerGiftSoa.propTypes = {
  customerId: PropTypes.any,
  fetchGiftSoaList: PropTypes.func,
  giftSoaList: PropTypes.array,
  giftSoaSuccess: PropTypes.bool,
  giftSoa: PropTypes.bool,
};

export { CustomerGiftSoa };
