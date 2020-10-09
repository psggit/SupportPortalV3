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
  useEffect(() => {
    // props.selectOrder(50011333399945);
    // console.log("[order details component] ", props.orderData);
    if (props.orderData === null) {
      history.push("/dashboard");
    } else {
      loopData(props.orderData.order_details);
    }
  }, []);

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
    };
  };

  const filledRows = [];

  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setShowData(true);
    setRowsData(filledRows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const selectOrderId = (event, orderId) => {
    props.selectOrder(orderId);
    console.log("selectOrderId ", orderId, props);
    history.push("/order-info");
  };

  if (!showData) {
    return (
      <Container>
        <p>No data available</p>
      </Container>
    );
  }

  return (
    <Container component="main">
      <TopBar />
      <Box width="90%" mx="auto" mt={4}>
        <TableContainer component={Paper}>
          <Table aria-label="order table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">Order ID</TableCell>
                <TableCell align="right">Date & Time</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="right">Consumer ID</TableCell>
                <TableCell align="right">Consumer Name</TableCell>
                <TableCell align="right">Consumer Mobile</TableCell>
                <TableCell align="right">Retailer ID</TableCell>
                <TableCell align="right">Retailer Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.order_id}>
                    <TableCell align="right">
                      <Button
                        onClick={(event) => selectOrderId(event, row.order_id)}
                        className={classes.btn}
                      >
                        {row.order_id}
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {formatDate(row.date_and_time)}
                    </TableCell>
                    <TableCell align="right">{row.order_status}</TableCell>
                    <TableCell align="right">{row.consumer_id}</TableCell>
                    <TableCell align="right">{row.consumer_name}</TableCell>
                    <TableCell align="right">
                      {row.consumer_contact_number}
                    </TableCell>
                    <TableCell align="right">{row.retailer_id}</TableCell>
                    <TableCell align="right">{row.retailer_name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

OrderDetailsComponent.propTypes = {
  selectOrder: PropTypes.func,
  orderId: PropTypes.any,
  orderData: PropTypes.object,
};

export { OrderDetailsComponent };
