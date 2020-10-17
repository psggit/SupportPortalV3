import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function pagination(props) {
  const classes = useStyles();

  const handlePageChange = (activePage) => {
    const offset = props.itemsCountPerPage * (activePage - 1);
    props.setPage({
      activePage,
      offset,
    });
  };

  return (
    <div className={classes.root}>
      <Pagination
        activePage={props.activePage}
        // itemsCountPerPage={props.itemsCountPerPage}
        rowsPerPage={props.rowsPerPage}
        count={props.count}
        onChange={handlePageChange}
      />
    </div>
  );
}

pagination.propTypes = {
  activePage: PropTypes.number,
  itemsCountPerPage: PropTypes.number,
  totalItemsCount: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  setPage: PropTypes.func,
};
