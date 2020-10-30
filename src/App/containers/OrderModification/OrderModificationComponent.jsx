import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import TopBar from "../../components/topBar";
import Loading from "../../components/loading";
import Alert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import ErrorMsg from "../../components/errorMsg";
import AutorenewIcon from "@material-ui/icons/Autorenew";

import {
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden",
    "& .MuiIconButton-root.disabled": {
      cursor: "not-allowed",
    },
  },
  btn: {
    textDecoration: "underline",
  },
}));

const createData = ({
  order_id,
  ref_order_id,
  status,
  hipbar_wallet,
  gift_wallet,
  nodal_amount,
  request_by_id,
  cancelled_by,
  cancelled_by_id,
}) => {
  return {
    order_id,
    ref_order_id,
    status,
    hipbar_wallet,
    gift_wallet,
    nodal_amount,
    request_by_id,
    cancelled_by,
    cancelled_by_id,
  };
};

const OrderModificationComponent = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [disableClear, setDisableClear] = useState("");

  useEffect(() => {
    return () => {
      props.resetOnUnmount();
    };
  }, []);

  useEffect(() => {
    const payload = {
      pending_request: true,
      completed_request: true,
      order_id: "",
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    props.fetchListOrderModification(payload);
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.fetchOrderSuccess) {
      if (props.orderList.order_modification !== null) {
        loopData(props.orderList.order_modification);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [page, props.fetchOrderSuccess]);

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

  const selectOrderId = (event, orderId) => {
    // props.selectOrder(orderId);
    history.push(`/order-info/${orderId}`);
  };

  const sendSMS = (event, orderId) => {
    props.sendSMSOperation(orderId);
  };

  const refreshOrder = (event, orderId) => {
    console.log("refreshOrder");
    const payload = {
      order_id: orderId,
    };
    props.fetchUpdatedStatus(payload);
  };

  const cancelOrder = (event, orderId) => {
    console.log("cancelOrder");
    setDisableClear(orderId);
    props.cancelOrderRequest(orderId);
  };

  let loading = props.fetchOrderInProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  console.log(props);

  return (
    <div className={classes.formContainer}>
      <TopBar />
      {/* <Box width="200px" display="flex">
        <Alert severity="success">SUCCESS</Alert>
        <Alert severity="error">CANCELLED</Alert>
        <Alert severity="warning">PENDING</Alert>
      </Box> */}
      <Box width="95%" mx="auto" className={classes.table} mt={4}>
        <TableContainer className={classes.TableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">ORDER ID</TableCell>
                <TableCell align="center">MODIFICATION ORDER ID</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center">SEND SMS</TableCell>
                <TableCell align="center">UPDATE STATUS</TableCell>
                <TableCell align="center">CANCEL REQUEST</TableCell>
                <TableCell align="center">HIPBAR WALLET</TableCell>
                <TableCell align="center">GIFT WALLET</TableCell>
                <TableCell align="center">NODAL AMOUNT</TableCell>
                <TableCell align="center">REQUEST BY ID</TableCell>
                <TableCell align="center">CANCELLED BY</TableCell>
                <TableCell align="center">CANCELLED BY ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.fetchOrderSuccess &&
                rows &&
                rows.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <Button
                          onClick={(event) =>
                            selectOrderId(event, data.ref_order_id)
                          }
                          className={classes.btn}
                        >
                          {data.ref_order_id}
                        </Button>
                      </TableCell>
                      <TableCell>{data.order_id}</TableCell>
                      <TableCell>
                        {data.status == "success" && (
                          <Alert severity="success">{data.status}</Alert>
                        )}
                        {data.status == "cancelled" && (
                          <Alert severity="error">{data.status}</Alert>
                        )}
                        {data.status == "pending" && (
                          <Alert severity="warning">{data.status}</Alert>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={(event) => sendSMS(event, data.order_id)}
                          disabled={!(data.status == "pending")}
                        >
                          <SendIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={(event) =>
                            refreshOrder(event, data.order_id)
                          }
                          disabled={!(data.status == "pending")}
                        >
                          <AutorenewIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          variant="outlined"
                          color="primary"
                          onClick={(event) => cancelOrder(event, data.order_id)}
                          disabled={
                            !(data.status == "pending") ||
                            disableClear === data.order_id
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{data.hipbar_wallet}</TableCell>
                      <TableCell>{data.gift_wallet}</TableCell>
                      <TableCell>{data.nodal_amount}</TableCell>
                      <TableCell>{data.request_by_id}</TableCell>
                      <TableCell>{data.cancelled_by}</TableCell>
                      <TableCell>{data.cancelled_by_id}</TableCell>
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
          {showData && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={props.orderList.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
        {(props.sendSMSSuccess || props.sendSMSFailed) && (
          <ErrorMsg show={true} message={props.msg.message} type={"info"} />
        )}
        {(props.fetchUpdatedStatusSuccess ||
          props.fetchUpdatedStatusFailed) && (
          <ErrorMsg
            show={true}
            message={props.msg.payload.message}
            type={"info"}
          />
        )}
        {props.fetchCancelCartSuccess && (
          <ErrorMsg
            show={true}
            message={"Order cancelled successfully."}
            type="success"
          />
        )}
      </Box>
    </div>
  );
};

OrderModificationComponent.propTypes = {
  fetchListOrderModification: PropTypes.func,
  sendSMSOperation: PropTypes.func,
  cancelOrderRequest: PropTypes.func,
  fetchOrderSuccess: PropTypes.bool,
  fetchOrderInProgress: PropTypes.bool,
  sendSMSInProgress: PropTypes.bool,
  sendSMSSuccess: PropTypes.bool,
  sendSMSFailed: PropTypes.bool,
  fetchCancelCartSuccess: PropTypes.bool,
  orderList: PropTypes.any,
  msg: PropTypes.any,
  resetOnUnmount: PropTypes.func,
  fetchUpdatedStatus: PropTypes.func,
  fetchUpdatedStatusSuccess: PropTypes.bool,
  fetchUpdatedStatusFailed: PropTypes.bool,
};

export { OrderModificationComponent };
