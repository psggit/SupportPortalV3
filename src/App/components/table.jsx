import React from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader: {
    color: "#010B13",
    fontWeight: "bold",
    backgroundColor: "#E5E5E5",
    borderBottom: "2px solid #C7C7C7",
    borderTop: "2px solid #C7C7C7"
  }
})

function table(props) {
  const classes = useStyles()
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.tableHeaders.map((item, i) => (
              <TableCell className={classes.tableHeader} align="left" key={i}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

table.propTypes = {
  children: PropTypes.node,
  tableHeaders: PropTypes.array
}

export default table
