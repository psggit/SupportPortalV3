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
import { TablePagination } from "@material-ui/core";
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
}));

const OrderDetailsComponent = (props) => {
  const history = useHistory();
  // console.log("OrderDetailsComponent ", props.payloadInfo);
  useEffect(() => {
    if (props.payloadInfo === undefined) {
      history.push("/dashboard");
    } else {
      props.fetchOrderDetails(props.payloadInfo);
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

  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const formatDate = (date) => {
    let formattedDate = Moment(date).format("D MMM h:mm A");
    return formattedDate;
  };

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
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
      <Box width="90%" mx="auto" mt={4}>
        <TableContainer component={Paper}>
          <Table aria-label="order table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Order ID</TableCell>
                <TableCell align="center">Date & Time</TableCell>
                <TableCell align="center">Order Status</TableCell>
                <TableCell align="center">Consumer ID</TableCell>
                <TableCell align="center">Consumer Name</TableCell>
                <TableCell align="center">Consumer Mobile</TableCell>
                <TableCell align="center">Retailer ID</TableCell>
                <TableCell align="center">Retailer Name</TableCell>
                <TableCell align="center">Delivery Agent Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showData &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.order_id}>
                      <TableCell align="center">
                        <Button
                          onClick={(event) =>
                            selectOrderId(event, row.order_id)
                          }
                          className={classes.btn}
                        >
                          {row.order_id}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {formatDate(row.date_and_time)}
                      </TableCell>
                      <TableCell align="center">{row.order_status}</TableCell>
                      <TableCell align="center">{row.consumer_id}</TableCell>
                      <TableCell align="center">{row.consumer_name}</TableCell>
                      <TableCell align="center">
                        {row.consumer_contact_number}
                      </TableCell>
                      <TableCell align="center">{row.retailer_id}</TableCell>
                      <TableCell align="center">{row.retailer_name}</TableCell>
                      <TableCell align="center">
                        {row.delivery_agent_name}
                      </TableCell>
                    </TableRow>
                  ))}
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
