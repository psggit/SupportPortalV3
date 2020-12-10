import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
  TableContainer,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  Box,
  Typography,
} from "@material-ui/core";
import Moment from "moment";
import Loading from "../../components/loading";
import TopBar from "../../components/topBar";
import SimpleMenuBar from "../../components/simpleMenuBar";
import ErrorMsg from "../../components/errorMsg";

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
  tableRow: {
    background: theme.palette.background.paper,
  },
}));

const rowsPerPageOptions = [5, 10, 25];

function HipcoinsComponent(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  //const [limit, setLimit] = useState(rowsPerPageOptions[0]);
  // const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetchLoyalityPointsOrderList();
  }, [page, rowsPerPage]);

  const fetchLoyalityPointsOrderList = () => {
    const payload = {
      "limit": rowsPerPage,
      "offset": ((page - 1) * parseInt(rowsPerPage)),
    };
    props.resetDefaultState();
    props.fetchLoyalityPointsList(payload);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <div className={classes.formContainer}>
      <TopBar />
      {props.fetchLoyalityPointsInProgress && <Loading message="Fetching data..." />}
      <Box className={classes.table} mt={4}>
        <TableContainer className={classes.TableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">CONSUMER ID</TableCell>
                <TableCell align="center">ORDER ID</TableCell>
                <TableCell align="center">PARTNER</TableCell>
                <TableCell align="center">ORDER GENERATED TIME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.fetchLoyalityPointsSuccess &&
                props.loyalityPoints &&
                props.loyalityPoints.order_details.map((data, index) => {
                  return (
                    <TableRow key={index} className={classes.tableRow}>
                      <TableCell align="center">{data.order_id}</TableCell>
                      <TableCell align="center">{data.consumer_id}</TableCell>
                      <TableCell align="center">{data.partner}</TableCell>
                      <TableCell align="center">
                        {Moment(data.order_generated_time).format("DD/MM/YYYY h:mm A")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {props.fetchLoyalityPointsSuccess && props.loyalityPoints.order_details.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {props.fetchLoyalityPointsSuccess && props.loyalityPoints.order_details.length > 0 && (
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={props.loyalityPoints.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </TableContainer>
      </Box>
      {props.errorMsg && (
        <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
      )}
    </div>
  );
}

HipcoinsComponent.propTypes = {
  fetchLoyalityPointsInProgress: PropTypes.bool,
  fetchLoyalityPointsSuccess: PropTypes.bool,
  fetchLoyalityPointsFailed: PropTypes.bool,
  loyalityPoints: PropTypes.array,
  errorMsg: PropTypes.string,
};

export { HipcoinsComponent };
