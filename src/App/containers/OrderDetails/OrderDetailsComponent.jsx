import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TopBar from "../../components/topBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import { TablePagination, Typography } from "@material-ui/core";
import Loading from "../../components/loading";
import ErrorMsg from "../../components/errorMsg";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  btn: {
    textDecoration: "underline",
  },
  dateTime: {
    minWidth: 150,
  },
  verticalSeparator: {
    borderRight: "1px solid rgba(224, 224, 224, 1)",
  },
  marginBottomCls: {
    marginBottom: 10,
  },
}));

const OrderDetailsComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const formatDate = (date) => {
    let formattedDate = Moment(date).format("D MMM YYYY, h:mm A");
    return formattedDate;
  };
  let savedPayload = JSON.parse(
    window.localStorage.getItem("dashboardPayload")
  );
  // console.log("OrderDetailsComponent ", props.payloadInfo);
  useEffect(() => {
    // let payload = {"pagination":{"limit":25,"offset":0},"filter":{"order_id":"33"}};
    // let payload = {"pagination":{"limit":25,"offset":0},"filter":{"order_id":33}};
    const payload = {
      pagination: { limit: rowsPerPage, offset: page * rowsPerPage },
      ...savedPayload,
    };
    if (payload === undefined) {
      history.push("/dashboard");
    } else {
      props.fetchOrderDetails(payload);
    }
  }, []);

  useEffect(() => {
    if (props.fetchDetailsSuccess) {
      if (props.orderData !== null) {
        loopData(props.orderData.order_details);
        setShowData(true);
      } else {
        history.push("/dashboard");
      }
    }
  }, [props.fetchDetailsSuccess]);

  const createData = ({
    order_id,
    date_and_time,
    order_status,
    consumer_id,
    consumer_name,
    consumer_contact_number,
    retailer_id,
    retailer_name,
    delivery_agent_name,
    delivery_agent_status,
  }) => {
    return {
      order_id,
      date_and_time,
      order_status,
      consumer_id,
      consumer_name,
      consumer_contact_number,
      retailer_id,
      retailer_name,
      delivery_agent_name,
      delivery_agent_status,
    };
  };

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(data);
  };

  const handleChangePage = (event, newPage) => {
    const payload = {
      pagination: {
        limit: rowsPerPage,
        offset: newPage * rowsPerPage,
      },
      ...savedPayload,
    };
    props.fetchOrderDetails(payload);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    const payload = {
      pagination: {
        limit: parseInt(event.target.value),
        offset: page * parseInt(event.target.value),
      },
      ...savedPayload,
    };
    props.fetchOrderDetails(payload);
    setPage(0);
  };

  const selectOrderId = (event, orderId) => {
    props.selectOrder(orderId);
    history.push(`/order-info/${orderId}`);
  };

  return (
    <Container component="main">
      <TopBar />
      {props.fetchDetailsProgress && <Loading message="Fetching data..." />}
      <Box width="95%" mx="auto" mt={4}>
        {showData && (
          <Typography type="subtitle1" className={classes.marginBottomCls}>
            Search Results:
          </Typography>
        )}
        <TableContainer component={Paper}>
          <Table aria-label="order table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Order ID</TableCell>
                <TableCell align="center" className={classes.dateTime}>
                  Date & Time
                </TableCell>
                <TableCell align="center" className={classes.verticalSeparator}>
                  Order Status
                </TableCell>
                {localStorage.getItem("x-hasura-role") !==
                  "ops_delivery_manager" && (
                  <TableCell align="center">Consumer ID</TableCell>
                )}
                {localStorage.getItem("x-hasura-role") !==
                  "ops_delivery_manager" && (
                  <TableCell align="center">Consumer Name</TableCell>
                )}
                {localStorage.getItem("x-hasura-role") !==
                  "ops_delivery_manager" && (
                  <TableCell
                    align="center"
                    className={classes.verticalSeparator}
                  >
                    Consumer Mobile
                  </TableCell>
                )}
                <TableCell align="center">Retailer ID</TableCell>
                <TableCell align="center" className={classes.verticalSeparator}>
                  Retailer Name
                </TableCell>
                <TableCell align="center">Delivery Agent Name</TableCell>
                <TableCell align="center">Delivery Agent Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showData &&
                rows.map((row) => (
                  <TableRow key={row.order_id} hover={true}>
                    <TableCell align="center">
                      <Button
                        onClick={(event) => selectOrderId(event, row.order_id)}
                        className={classes.btn}
                      >
                        {row.order_id}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(row.date_and_time)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.verticalSeparator}
                    >
                      {row.order_status}
                    </TableCell>
                    {localStorage.getItem("x-hasura-role") !==
                      "ops_delivery_manager" && (
                      <TableCell align="center">{row.consumer_id}</TableCell>
                    )}
                    {localStorage.getItem("x-hasura-role") !==
                      "ops_delivery_manager" && (
                      <TableCell align="center">{row.consumer_name}</TableCell>
                    )}
                    {localStorage.getItem("x-hasura-role") !==
                      "ops_delivery_manager" && (
                      <TableCell
                        align="center"
                        className={classes.verticalSeparator}
                      >
                        {row.consumer_contact_number}
                      </TableCell>
                    )}
                    <TableCell align="center">{row.retailer_id}</TableCell>
                    <TableCell
                      align="center"
                      className={classes.verticalSeparator}
                    >
                      {row.retailer_name}
                    </TableCell>
                    <TableCell align="center">
                      {row.delivery_agent_name}
                    </TableCell>
                    <TableCell align="center">
                      {row.delivery_agent_status}
                    </TableCell>
                  </TableRow>
                ))}
              {!showData && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    {/* {No data available} */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {showData && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.orderData.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>
      {props.fetchDetailsFail && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
    </Container>
  );
};

OrderDetailsComponent.propTypes = {
  selectOrder: PropTypes.func,
  fetchOrderDetails: PropTypes.func,
  orderId: PropTypes.any,
  orderData: PropTypes.object,
  payloadInfo: PropTypes.any,
  fetchDetailsProgress: PropTypes.bool,
  fetchDetailsSuccess: PropTypes.bool,
  fetchDetailsFail: PropTypes.bool,
  errorMsg: PropTypes.string,
};

export { OrderDetailsComponent };
