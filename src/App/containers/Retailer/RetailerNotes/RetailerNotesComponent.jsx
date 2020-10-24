/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import SimpleMenuBar from "../../../components/simpleMenuBar";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
} from "../../../utils/helpers";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import { useHistory } from "react-router-dom";

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
  { label: "NOTE NO", value: "order_id" },
  { label: "NOTE TYPE", value: "type" },
  { label: "DESCRIPTION", value: "notes" },
  { label: "CREATED BY", value: "created_by" },
  { label: "CREATED AT", value: "created_at" },
];

function RetailerNotesComponent(props) {
  console.log("[RetailerNotesComponent]", props);
  const classes = useStyles();
  const pageLimit = 20;
  const activePage = getQueryParamByName("activePage") || 1;
  const [pageNo, setPageNo] = useState(activePage);
  const history = useHistory();
  console.log(" ------------------ ");
  console.log(history.location.state.orderId);
  const orderId = history.location.state.orderId;

  useEffect(() => {
    const payload = {
      order_id: orderId,
      type: "retailer",
    };
    props.fetchRetailerNotesList(payload);
  }, []);

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage);
    const queryParamsObj = {
      activePage: pageObj.activePage,
    };
    history.pushState(
      queryParamsObj,
      "notes listing",
      `/retailer-notes ${getQueryUri(queryParamsObj)}`
    );
  };

  let loading = props.notesProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.formContainer}>
      <TopBar />
      <SimpleMenuBar orderId={orderId}>
        {props.notesSuccess && <p>CHANGE RETAILER</p>}
      </SimpleMenuBar>
      <div className={classes.row1}>
        <p>CUSTOMER ID: {"1234567"}</p>
        <div>
          <Button variant="contained" color="primary">
            Add Note
          </Button>
        </div>
      </div>
      <div className={classes.table}>
        <Paper className={classes.paper}>
          <Table tableHeaders={tableHeaders}>
            {props.notesSuccess && props.notesList.orderNotes !== null
              ? props.notesList.orderNotes.map((data) => {
                  return (
                    <TableRow>
                      <TableCell>{data.order_id}</TableCell>
                      <TableCell>{data.type}</TableCell>
                      <TableCell>{data.notes}</TableCell>
                      <TableCell>{data.created_by}</TableCell>
                      <TableCell align="left">
                        {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                      </TableCell>
                    </TableRow>
                  );
                })
              : !props.notesSuccess && (
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
        {/* {props.notesSuccess && (
          <Pagination
            activePage={parseInt(pageNo)}
            //itemsCountPerPage={parseInt(pageLimit)}
            rowsPerPage={parseInt(pageLimit)}
            count={props.notesList.consumer_soa.count}
            setPage={handlePageChange}
            color="primary"
          />
        )} */}
      </div>
    </div>
  );
  // }
}

RetailerNotesComponent.propTypes = {
  notesList: PropTypes.array,
  fetchRetailerNotesList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  orderId: PropTypes.any,
};

export { RetailerNotesComponent };
