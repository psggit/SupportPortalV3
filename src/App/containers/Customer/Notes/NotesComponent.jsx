import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Moment from "moment";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "../../../components/dialog";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import TopBar from "../../../components/topBar";
import FullWidthTabs from "../customerMenuBar";
import { Tab } from "@material-ui/core";
import Loading from "../../../components/loading";

const tableHeaders = [
  { label: "NOTE NO", value: "note_no" },
  { label: "NOTE TYPE", value: "note_type" },
  { label: "DESCRIPTION", value: "desc" },
  { label: "CREATED BY", value: "created_by" },
  { label: "CREATED AT", value: "created_at" },
];

function Notes(props) {
  const history = useHistory();
  const classes = useStyles();

  // const pageLimit = 2
  // const activePage = getQueryParamByName("activePage") || 1
  // const [isLoading, setLoading] = useState(false)
  // const [pageNo, setPageNo] = useState(activePage)

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [age, setAge] = useState("");

  useEffect(() => {
    props.fetchConsumerNotes(props.orderInfo.order_id);
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  let loading = props.notesProgress;
  if (loading) {
    return <Loading message="Loading..." />;
  }

  return (
    <>
      <TopBar />
      <div className={classes.formContainer}>
        <FullWidthTabs
          value={4}
          orderId={props.orderInfo.order_id}
          customerId={props.orderInfo.customer_id}
        />
        <div className={classes.row1}>
          <p>CUSTOMER ID: {props.customerId}</p>
          <div>
            <Button variant="contained" onClick={mountAddNote} color="primary">
              Add Note
            </Button>
            {showAddNoteDilog && (
              <Dialog
                title="ADD NOTE"
                actions={[
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={UnmountAddNote}
                    key="cancelBtn"
                  >
                    Cancel
                  </Button>,
                  <Button
                    variant="outlined"
                    color="primary"
                    key="saveBtn"
                    //onClick={commentUnmountModel}
                  >
                    Save
                  </Button>,
                ]}
              >
                <form>
                  <div className={classes.selectIssue}>
                    <div>Select Issue</div>
                    <div>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={age}
                          onChange={handleChange}
                          displayEmpty
                          className={classes.selectEmpty}
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.formRoot}>
                    <TextareaAutosize
                      className={classes.formControlTextarea}
                      aria-label="minimum height"
                      rowsMin={7}
                      //onChange={handleCommentChange}
                      placeholder="Add note here"
                    />
                  </div>
                </form>
              </Dialog>
            )}
          </div>
        </div>
        <div className={classes.table}>
          <Paper className={classes.paper}>
            <Table tableHeaders={tableHeaders}>
              {props.notesSuccess && props.customerNotes.orderNotes !== null
                ? props.customerNotes.orderNotes.map((data, ind) => {
                    return (
                      <TableRow key={ind}>
                        <TableCell>{data.order_id}</TableCell>
                        <TableCell>{data.type}</TableCell>
                        <TableCell>{data.notes}</TableCell>
                        <TableCell align="left">{data.created_by}</TableCell>
                        <TableCell align="left">
                          {Moment(data.created_at).format("DD/MM/YYYY h:mm A")}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : props.notesSuccess &&
                  props.customerNotes.orderNotes == null && (
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
    </>
  );
}

Notes.propTypes = {
  customerNotes: PropTypes.array,
  fetchConsumerNotes: PropTypes.any,
  notesProgress: PropTypes.bool,
  notesSuccess: PropTypes.bool,
  customerId: PropTypes.any,
  orderInfo: PropTypes.object,
};

export { Notes };

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
  formRoot: {
    padding: 24,
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10,
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060",
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
}));
