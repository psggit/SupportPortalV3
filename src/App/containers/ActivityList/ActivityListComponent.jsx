/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import Pagination from "../../../components/pagination";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import {
  getOffsetUsingPageNo,
  getQueryParamByName,
  getQueryUri,
} from "../../utils/helpers";
import Paper from "@material-ui/core/Paper";

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

function ActivityListComponent(props) {
  console.log("[ActivityListComponent]", props);
  const classes = useStyles();
  const pageLimit = 20;
  const activePage = getQueryParamByName("activePage") || 1;
  const [pageNo, setPageNo] = useState(activePage);

  useEffect(() => {
    // const reqBody = { order_id: props.orderId, limit: pageLimit, offset: 0 };
    const reqBody = { order_id: 50011546022614, limit: pageLimit, offset: 0 };
    props.fetchRetailerNotesList(reqBody);
  }, []);

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage);
    const queryParamsObj = {
      activePage: pageObj.activePage,
    };
    // history.pushState(
    //   queryParamsObj,
    //   "notes listing",
    //   `/retailer-notes ${getQueryUri(queryParamsObj)}`
    // );
  };

  let loading = props.notesProgress;
  if (loading) {
    return <p>Loading...</p>;
  }

  console.clear();
  console.log(props);

  return (
    <div className={classes.formContainer}>
      <div className={classes.navBar}>
        <div className={classes.backButton}>
          <div>Back</div>
        </div>
      </div>
      <div className={classes.row1}>
        <p>ACTIVITY LOGS-ORDER ID: {"1234567"}</p>
      </div>
      <div className={classes.table}>
        <Paper className={classes.paper}>
          <Table>
            {props.notesSuccess && props.notesList.orderNotes !== null
              ? props.notesList.orderNotes.map((data) => {
                  return (
                    <TableRow>
                      <TableCell>{data.created_by}</TableCell>
                      <TableCell>{data.notes}</TableCell>
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
      </div>
    </div>
  );
  // }
}

ActivityListComponent.propTypes = {
  notesList: PropTypes.array,
  fetchRetailerNotesList: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  orderId: PropTypes.any,
};

export { ActivityListComponent };
