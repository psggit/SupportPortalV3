import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
//import { Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import TopBar from "../../components/topBar";
import Paper from "@material-ui/core/Paper";
import Loading from "../../components/loading";
import Alert from "@material-ui/lab/Alert";
import SendIcon from "@material-ui/icons/Send";
import ClearIcon from "@material-ui/icons/Clear";
import { Box } from "@material-ui/core";
import ErrorMsg from "../../components/errorMsg";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import {
  Grid,
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
//import Tabs from "@material-ui/core/Tabs";

const createData = ({
  order_id,
  // ref_order_id,
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
    // ref_order_id,
    status,
    hipbar_wallet,
    gift_wallet,
    nodal_amount,
    request_by_id,
    cancelled_by,
    cancelled_by_id,
  };
};

const ModificationListComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [showData, setShowData] = useState(false);
  const [rows, setRowsData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [disableClear, setDisableClear] = useState("");
  const orderId = history.location.state.orderId;
  // console.log("orderId", history.location.state.orderId);

  useEffect(() => {
    const payload = {
      pending_request: true,
      completed_request: true,
      order_id: orderId,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    };
    if (
      localStorage.getItem("x-hasura-role") !== "ops_delivery_manager" ||
      localStorage.getItem("x-hasura-role") !== "support_person"
    ) {
      props.fetchListOrderModification(payload);
    }
  }, [rowsPerPage, page]);

  useEffect(() => {
    if (props.fetchModificationSuccess) {
      if (props.orderList.order_modification !== null) {
        loopData(props.orderList.order_modification);
        setShowData(true);
      } else {
        setShowData(false);
      }
    }
  }, [page, props.fetchModificationSuccess]);

  const filledRows = [];
  const loopData = (data) => {
    data.map((value) => {
      filledRows.push(createData(value));
    });
    setRowsData(filledRows);
  };

  const selectOrderId = (event, orderId) => {
    // props.selectOrder(orderId);
    history.push(`/order-info/${orderId}`);
  };

  const sendSMS = (event, orderId) => {
    props.sendSMSOperation(orderId);
  };

  const refreshOrder = (event, orderId) => {
    const payload = {
      order_id: orderId,
    };
    props.fetchUpdatedStatus(payload);
    setTimeout(() => {
      location.reload();
    }, 2500);
  };

  const cancelOrder = (event, orderId) => {
    setDisableClear(orderId);
    props.cancelOrderRequest(orderId);
    setTimeout(() => {
      location.reload();
    }, 2500);
  };

  let loading = props.fetchOrderInProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  const handleBack = () => {
    history.push(`/order-info/${orderId}`);
  };

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <Paper className={classes.nav}>
          <Grid alignItems="center" container>
            <Grid item xs={1}>
              <Button
                color="primary"
                startIcon={<KeyboardBackspaceIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Box
          width="95%"
          mx="auto"
          className={classes.table}
          mt={4}
          component={Paper}
        >
          <TableContainer className={classes.TableContainer}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="center">ORDER ID</TableCell> */}
                  <TableCell align="center">MODIFICATION ORDER ID</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">SEND SMS</TableCell>
                  <TableCell align="center">UPDATE STATUS</TableCell>
                  <TableCell align="center">CANCEL REQUEST</TableCell>
                  <TableCell align="center">HIPBAR WALLET</TableCell>
                  <TableCell align="center">GIFT WALLET</TableCell>
                  <TableCell align="center">NODAL AMOUNT</TableCell>
                  <TableCell align="center">MODIFIED BY (ID)</TableCell>
                  <TableCell align="center">CANCELLED BY</TableCell>
                  <TableCell align="center">CANCELLED BY (ID)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.fetchModificationSuccess &&
                  rows &&
                  rows.map((data, index) => {
                    return (
                      <TableRow key={index}>
                        {/* <TableCell>
                          <Button
                            onClick={(event) =>
                              selectOrderId(event, data.ref_order_id)
                            }
                            className={classes.btn}
                          >
                            {data.ref_order_id}
                          </Button>
                        </TableCell> */}
                        <TableCell className={classes.orderDiv}>{data.order_id}</TableCell>
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
                            onClick={(event) =>
                              cancelOrder(event, data.order_id)
                            }
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
            {/* {showData && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.orderList.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            )} */}
          </TableContainer>
          {props.sendSMSSuccess && (
            <ErrorMsg show={true} message={props.msg} type={"info"} />
          )}
          {props.sendSMSFailed && (
            <ErrorMsg show={true} message={props.msg} type={"info"} />
          )}
          {(props.fetchUpdatedStatusSuccess ||
            props.fetchUpdatedStatusFailed) && (
            <ErrorMsg
              show={true}
              message={props.updatedStatusMsg.payload.message}
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
    </>
  );
};

ModificationListComponent.propTypes = {
  fetchListOrderModification: PropTypes.func,
  sendSMSOperation: PropTypes.func,
  cancelOrderRequest: PropTypes.func,
  fetchModificationSuccess: PropTypes.bool,
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
  updatedStatusMsg: PropTypes.any,
};

export { ModificationListComponent };

const useStyles = makeStyles(() => ({
  nav: {
    cursor: "pointer",
    alignItems: "center",
    paddingBottom: "5px",
  },
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
