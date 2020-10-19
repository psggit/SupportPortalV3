import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
//import Pagination from "../../../components/pagination";
import Moment from "moment";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";

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
  paper: {},
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
      customer_contact_number: props.customerNumber,
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

  const handleCustomerDetail = () => {
    history.push("/customer-detail");
  };

  return (
    <>
      <TopBar />
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
            <div onClick={handleNotes}>Notes</div>
          </div>
        </div>
        <div className={classes.row1}>
          <p>CUSTOMER ID: {props.customerId}</p>
          <div>Search</div>
        </div>
        <div className={classes.table}>
          <Paper className={classes.paper}>
            <Table tableHeaders={tableHeaders}>
              {props.giftSoaSuccess
                ? props.giftSoaList.map((data) => {
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
                  })
                : !props.giftSoaSuccess && (
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
    </>
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
