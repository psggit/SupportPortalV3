import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from "react";
import Table from "../../../components/table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Pagination from "@material-ui/lab/Pagination";

const tableHeaders = [
  { label: "NOTE NO.", value: "order_id" },
  { label: "NOTE TYPE", value: "date_and_time" },
  { label: "DESCRIPTION", value: "order_status" },
  { label: "CREATED BY", value: "consumer_id" },
  { label: "CREATED AT", value: "consumer_name" },
]

function RetailerNotesListComponent(props) {

  const [count, setCount] = useState(5)

  const classes = useStyles()

  return (
    <div id="notes-list">
      {/* <div className="row1">
        <div>
          <Button onClick={handleBack}><Icon name="back" /></Button>
        </div>
        <div className="notes">
          <p>Notes</p>
        </div>
      </div> */}
      <div className="row2">
        {/* <div className="notesBar">
          <div className="customerID">
            <p>CUSTOMER ID: 1234</p>
          </div>
          <div>
            <Button
              className={classes.button}
              variant="contained"
              onClick={mountAddNote}
            >
              Add Note
            </Button>
            {
              showAddNoteDilog &&
              <Dialog
                title="ADD NOTE"
                actions={[
                  <Button
                    className={classes.secondaryButton}
                    variant="contained"
                    color="secondary"
                    onClick={UnmountAddNote}
                  >
                    Cancel
                    </Button>,
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                  //onClick={commentUnmountModel}
                  >
                    save
                    </Button>
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
                          inputProps={{ 'aria-label': 'Without label' }}
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
            }
          </div>
        </div> */}
        <div className="notesList">
          <Table tableHeaders={tableHeaders}>
            {               
                   props.RetailerNotes.map((data, index) => {
                    return (
                      <TableRow className={classes.tableRow} key={index}>
                        <TableCell component="th" scope="row" align="left">
                          {data.note_no}
                        </TableCell>
                        <TableCell align="left">{data.note_no}</TableCell>
                        <TableCell align="left">{data.description}</TableCell>
                        <TableCell align="left">{data.created_by}</TableCell>
                        <TableCell align="left">{data.created_at}</TableCell>
                      </TableRow>
                    )
                  })
            }
          </Table>
          <div className={classes.root}>
            <Pagination
             page={1}
             count={count} 
            color="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    }
  },
  button: {
    color: "#FFFFFF",
    backgroundColor: "#0086AD",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "21px",
    borderRadius: "4px",
    marginLeft: "16px",
    border: "1.6px solid #0086AD"
  },
  secondaryButton: {
    color: "#0086AD",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "21px",
    borderRadius: "4px",
    border: "1.6px solid #0086AD"
  },
  formRoot: {
    padding: 24
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10
  },
  selectIssue: {
    display: "flex",
    paddingLeft: "24px",
    color: "#606060"
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  }
}))


export { RetailerNotesListComponent };