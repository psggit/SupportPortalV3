import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "../../components/dialog";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
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
import ErrorMsg from "../../components/errorMsg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden",
    "& .MuiIconButton-root.disabled": {
      cursor: "not-allowed",
    },
  },
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
  tableRow: {
    background: theme.palette.background.paper,
    cursor: "pointer",
  },
  section1: {
    padding: 24,
    height: `calc(100vh - 64px)`,
    boxShadow: "unset",
    borderRadius: 0,
  },
  section2: {
    overflowY: "scroll",
    "& .MuiAccordionSummary-root": {
      maxHeight: "56px",
    },
  },
  typography: {
    fontSize: 18,
  },
  filterHeading: {
    marginBottom: 10,
  },
  btn: {
    width: "100%",
    marginBottom: 10,
    textAlign: "left",
    fontWeight: 400,
  },
  btnSelected: {
    width: "100%",
    marginBottom: 10,
    background: "#e5f3f7",
    fontWeight: 600,
  },
  inputBox: {
    width: 300,
  },
  primaryBtn: {
    width: "100%",
  },
  btn2: {
    textDecoration: "underline",
    color: "inherit",
  },
}));

const rowsPerPageOptions = [5, 10, 25];

const filterOptions = [
  { name: "order_id", display_name: "Order ID" },
  { name: "consumer_id", display_name: "Consumer ID" },
];

function HipcoinsComponent(props) {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [mountFilterDialog, setMountFilterDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchLoyalityPointsOrderList();
  }, [page, rowsPerPage, selectedStatus, isFilterApplied]);

  const fetchLoyalityPointsOrderList = () => {
    const payload = {
      filter_by: filterBy ? filterBy : selectedStatus,
      filter_value: filterValue,
      limit: rowsPerPage,
      offset: page * parseInt(rowsPerPage),
    };
    props.fetchLoyalityPointsList(payload);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleStatusClick = (selectedValue) => {
    setSelectedStatus(selectedValue);
    resetFilter();
  };

  const handleRowClick = (data, orderData) => {
    history.push({
      pathname: `/hipcoins/order-details/${data.order_id}`,
      state: {
        orderData: orderData,
      },
    });
  };

  const mountFilter = () => {
    setMountFilterDialog(true);
  };

  const handleTextChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleFilterOptionChange = (e) => {
    setFilterBy(e.target.value);
  };

  const handleApplyFilter = () => {
    setSelectedStatus("");
    setIsFilterApplied(true);
    setPage(1);
    setMountFilterDialog(false);
  };

  const resetFilter = () => {
    setIsFilterApplied(false);
    setFilterBy("");
    setFilterValue("");
  };

  const RenderLeftBar = () => {
    return (
      <Paper className={classes.section1}>
        <Typography classes={{ root: classes.typography }}>
          Delivery Order
        </Typography>
        <br />
        <Typography variant="body2" className={classes.filterHeading}>
          Status
        </Typography>
        <Button
          size="small"
          className={
            selectedStatus === "pending" ? classes.btnSelected : classes.btn
          }
          onClick={() => handleStatusClick("pending")}
        >
          Pending
        </Button>
        <Button
          size="small"
          className={
            selectedStatus === "resolved" ? classes.btnSelected : classes.btn
          }
          onClick={() => handleStatusClick("resolved")}
        >
          Resolved
        </Button>
        <Button
          size="small"
          variant="contained"
          className={classes.primaryBtn}
          color="primary"
          onClick={() => mountFilter()}
        >
          Filter
        </Button>
      </Paper>
    );
  };

  const RenderHipcoinOrders = () => {
    return (
      <TableContainer className={classes.TableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ORDER ID</TableCell>
              <TableCell align="center">CONSUMER ID</TableCell>
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
                    <TableCell align="center">
                      <Button
                        color="primary"
                        className={classes.btn2}
                        onClick={() => handleRowClick(data, props.loyalityPoints.order_details)}
                      >
                        {data.order_id}
                      </Button>
                    </TableCell>
                    <TableCell align="center">{data.consumer_id}</TableCell>
                    <TableCell align="center">{data.partner}</TableCell>
                    <TableCell align="center">
                      {Moment(data.order_generated_time).format(
                        "DD/MM/YYYY h:mm A"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            {props.fetchLoyalityPointsSuccess &&
              props.loyalityPoints.order_details.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
        {props.fetchLoyalityPointsSuccess &&
          props.loyalityPoints.order_details.length > 0 && (
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
        {props.fetchLoyalityPointsFailed && (
          <ErrorMsg show={true} message={props.errorMsg} type={"error"} />
        )}
      </TableContainer>
    );
  };

  const renderFilterDialog = () => {
    return (
      <Dialog
        title="FILTER HIPCOIN ORDERS"
        actions={[
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setMountFilterDialog(false)}
            key="cancelBtn"
          >
            Cancel
          </Button>,
          <Button
            variant="contained"
            color="primary"
            key="saveBtn"
            onClick={handleApplyFilter}
          >
            Apply Filter
          </Button>,
        ]}
      >
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Choose Filter By
            </InputLabel>
            <Select
              className={classes.inputBox}
              variant="outlined"
              label="Choose Filter By"
              name="filter_by"
              inputProps={{
                name: "choose filter by",
                id: "demo-simple-select-label",
              }}
              onChange={(event) => handleFilterOptionChange(event)}
            >
              {filterOptions.map((item, index) => {
                return (
                  <MenuItem value={item.name} key={index}>
                    {item.display_name}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              id="outlined-multiline-static"
              onChange={handleTextChange}
              className={classes.inputBox}
              autoComplete="off"
              name="filter_value"
              variant="outlined"
              margin="normal"
              size="small"
              label="Filter Value"
            />
          </FormControl>
        </>
      </Dialog>
    );
  };

  return (
    <div className={classes.root}>
      <TopBar />
      {props.fetchLoyalityPointsInProgress && (
        <Loading message="Fetching data..." />
      )}
      <Box>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <RenderLeftBar />
          </Grid>
          <Grid item xs={10}>
            <Box
              width="90%"
              mx="auto"
              mt={4}
              mb={4}
              className={classes.section2}
            >
              <RenderHipcoinOrders />
            </Box>
          </Grid>
        </Grid>
        {mountFilterDialog && renderFilterDialog()}
      </Box>
    </div>
  );
}

HipcoinsComponent.propTypes = {
  fetchLoyalityPointsInProgress: PropTypes.bool,
  fetchLoyalityPointsSuccess: PropTypes.bool,
  fetchLoyalityPointsFailed: PropTypes.bool,
  loyalityPoints: PropTypes.object,
  errorMsg: PropTypes.string,
};

export { HipcoinsComponent };
