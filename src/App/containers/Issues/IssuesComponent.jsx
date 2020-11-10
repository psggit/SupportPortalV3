import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import TopBar from "../../components/topBar";
import { Typography } from "@material-ui/core";
import Dialog from "../../components/dialog";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Moment from "moment";
import Loading from "./../../components/loading";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { resolveIcon } from "./../../assets/images/index";
import ErrorMsg from "./../../components/errorMsg";
import uuid from "react-uuid";
// import {
//   Dialog,
//   DialogActions,
//   DialogTitle
// } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import TablePagination from "@material-ui/core/TablePagination";
import { getQueryParamByName, getQueryUri } from "../../utils/helpers";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "hidden",
    "& .MuiIconButton-root.disabled": {
      cursor: "not-allowed",
    },
  },
  section1: {
    padding: 24,
    height: `calc(100vh - 64px)`,
    boxShadow: "unset",
    borderRadius: 0,
  },
  typography: {
    fontSize: 18,
  },
  section2: {
    overflowY: "scroll",
    "& .MuiAccordionSummary-root": {
      maxHeight: "56px",
    },
  },
  accordion: {
    marginBottom: 16,
  },
  paper: {
    marginBottom: 16,
    padding: "12px 22px",
    //textAlign: 'center'
  },
  grid: {
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#0086AD",
    cursor: "pointer",
    textDecoration: "underline",
  },
  subtitle: {
    fontSize: 14,
    color: "#606060",
    wordBreak: "break-word",
  },
  dateStyle: {
    fontSize: 12,
    color: "#696969",
  },
  datePlacement: {
    fontSize: 12,
    color: "#696969",
    textAlign: "right",
  },
  buttonStyke: {
    fontSize: 14,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: 12,
    width: "32px",
    height: "32px",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  resolveIcon: {
    width: 28,
    height: 32,
  },
  resolveContainer: {
    cursor: "pointer",
  },
  selectIssue: {
    display: "flex",
    alignItems: "center",
    color: "#606060",
    fontSize: 16,
  },
  formControl: {
    marginLeft: "16px",
    minWidth: 120,
  },
}));

const RenderIssues = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const colors = ["purple", "orange"];
  const issuesList = props.issueList.issues;

  const [showDialog, setShowDialog] = useState(false);
  const [assignIssue, setAssignIssue] = useState(false);
  const [resolveIssue, setResolveIssue] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [supportPersonId, setSupportPersonId] = useState();
  const [issueId, setIssueId] = useState();
  const [data, setData] = useState([]);

  const PAGE_OPTIONS = [10, 20, 30];
  const currentPage = getQueryParamByName("pageSize") || PAGE_OPTIONS[0];
  const pageSize = getQueryParamByName("activePage") || 0;

  const [pageLimit, setPageLimit] = useState(currentPage);
  const [activePage, setActivePage] = useState(pageSize);

  useEffect(() => {
    props.fetchSupportPerson();
  }, []);

  useEffect(() => {
    if (!props.fetchSupportPersonListInProgress) {
      setSupportPersonId(props.supportPersonList.support_person[0].id);
    }
  }, [props.fetchSupportPersonListInProgress]);

  useEffect(() => {
    setData(
      issuesList.slice(
        activePage * pageLimit,
        parseInt(pageLimit) + parseInt(activePage * pageLimit)
      )
    );
  }, [activePage, pageLimit]);

  const unmountConfirmationDialog = () => {
    setShowDialog(false);
  };

  const mountConfirmationDialog = () => {
    setShowDialog(true);
  };

  const checkIsLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i);
  };

  const handleConfirmation = () => {
    let payload;

    if (assignIssue) {
      payload = {
        orderId: orderId,
        issueId: issueId,
        supportPersonId: supportPersonId,
      };
      props.assignIssue(payload);
    } else {
      payload = {
        orderId: orderId,
      };
      props.resolveIssue(payload);
    }

    unmountConfirmationDialog();
  };

  const handleResolveIssue = (e, issue) => {
    setResolveIssue(true);
    setOrderId(issue.order_id);
    setIssueId(issue.id);
    mountConfirmationDialog();
  };

  const handleAssignIssue = (e, issue) => {
    setAssignIssue(true);
    setOrderId(issue.order_id);
    setIssueId(issue.id);
    mountConfirmationDialog();
  };

  const handleChangePage = (e, pageNo) => {
    setActivePage(pageNo);
    const queryParamsObj = {
      activePage: pageNo,
      pageSize: pageLimit,
    };
    history.pushState(
      queryParamsObj,
      "issues listing",
      `/issues${getQueryUri(queryParamsObj)}`
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setPageLimit(event.target.value);
    if (parseInt(activePage) !== 0) setActivePage(0);

    const queryParamsObj = {
      activePage: parseInt(activePage) !== 0 ? 0 : activePage,
      pageSize: event.target.value,
    };

    history.pushState(
      queryParamsObj,
      "issues listing",
      `/issues${getQueryUri(queryParamsObj)}`
    );
  };

  const handleSupportPersonChange = (event) => {
    setSupportPersonId(event.target.value);
  };

  const handleClick = (orderId) => {
    history.push(`/order-info/${orderId}`);
  };

  return (
    <>
      {data.map((issue, index) => {
        const avatarColor =
          classes[colors[Math.floor(Math.random() * colors.length)]];
        return (
          <Accordion key={`accordian${index}`} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container item xs={12} classes={{ root: classes.grid }}>
                <Grid item xs={2}>
                  <ListItemText
                    className={classes.title}
                    primary={issue.order_id}
                    onClick={() => handleClick(issue.order_id)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    className={classes.subtitle}
                    primary={issue.reason}
                  />
                </Grid>
                <Grid item xs={3}>
                  <div className={classes.avatarContainer}>
                    <Avatar
                      classes={{ root: classes.avatar }}
                      className={avatarColor}
                    >
                      {checkIsLetter(issue.assigned_to_name.charAt(0))
                        ? issue.assigned_to_name.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                    <ListItemText
                      className={classes.subtitle}
                      primary={issue.assigned_to_name}
                    />
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <ListItemText
                    className={classes.dateStyle}
                    primary={`${Moment(issue.issue_raised_time).format(
                      "D MMM"
                    )} at ${Moment(issue.issue_raised_time).format("hh:mm A")}`}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonStyle}
                    onClick={(e) => handleAssignIssue(e, issue)}
                    disabled={
                      !issue.to_show_resolve || props.assignIssueInProgress
                    }
                  >
                    ASSIGN TO
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => handleResolveIssue(e, issue)}
                    disabled={
                      !issue.to_show_resolve || props.resolveIssueInProgress
                    }
                  >
                    <img src={resolveIcon} className={classes.resolveIcon} />
                  </IconButton>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs={12} classes={{ root: classes.grid }}>
                <Grid item xs={2}>
                  <ListItemText
                    className={classes.subtitle}
                    primary={"Assigned To"}
                  />
                </Grid>
                <Grid item xs={3}>
                  <div className={classes.avatarContainer}>
                    <Avatar
                      classes={{ root: classes.avatar }}
                      className={avatarColor}
                    >
                      {checkIsLetter(issue.assigned_to_name.charAt(0))
                        ? issue.assigned_to_name.charAt(0).toUpperCase()
                        : ""}
                    </Avatar>
                    <ListItemText
                      className={classes.subtitle}
                      primary={issue.assigned_to_name}
                    />
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <ListItemText
                    className={classes.datePlacement}
                    primary={`${Moment(issue.issue_raised_time).format(
                      "D MMM"
                    )} at ${Moment(issue.issue_raised_time).format("hh:mm A")}`}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
      {
        <TablePagination
          component="div"
          count={props.issueList.issues.length}
          page={parseInt(activePage)}
          onChangePage={handleChangePage}
          rowsPerPage={parseInt(pageLimit)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      }
      {showDialog && (
        <Dialog
          title={resolveIssue ? `RESOLVE ISSUE` : `REASSIGN ISSUE`}
          subtitle={
            resolveIssue ? "Are you sure want to ressolve the issue?" : ""
          }
          actions={[
            <Button
              onClick={() => unmountConfirmationDialog()}
              color="primary"
              variant="outlined"
              key={uuid()}
            >
              Cancel
            </Button>,
            <Button
              onClick={() => handleConfirmation()}
              color="primary"
              variant="contained"
              key={uuid()}
            >
              Confirm
            </Button>,
          ]}
        >
          <form>
            {!resolveIssue && (
              <div className={classes.selectIssue}>
                <div>Select support personel</div>
                <div>
                  <FormControl className={classes.formControl}>
                    <Select
                      value={supportPersonId}
                      onChange={handleSupportPersonChange}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      {!props.fetchSupportPersonListInProgress &&
                        props.supportPersonList.support_person.map((item) => {
                          return (
                            <MenuItem value={item.id} key={item.id}>
                              {item.username}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}
          </form>
        </Dialog>
      )}
      {props.assignIssueSuccess && (
        <ErrorMsg
          show={true}
          message={"Successfully assigned the issue"}
          type={"success"}
        />
      )}
      {props.resolveIssueSuccess && (
        <ErrorMsg
          show={true}
          message={"Successfully resolved the issue"}
          type={"success"}
        />
      )}
    </>
  );
};

const IssuesComponent = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchIssueList();
  }, []);

  useEffect(() => {
    if (props.assignIssueSuccess || props.resolveIssueSuccess) {
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }, [props.assignIssueSuccess, props.resolveIssueSuccess]);

  if (props.fetchIssuesInProgress) {
    return <Loading message="Loading Issues..." />;
  }

  return (
    <div className={classes.root}>
      <TopBar />
      <Box>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <Paper className={classes.section1}>
              <Typography classes={{ root: classes.typography }}>
                ISSUES
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Box
              width="90%"
              mx="auto"
              mt={4}
              mb={4}
              className={classes.section2}
            >
              {!props.fetchIssuesInProgress && props.issueList !== null && (
                <>
                  <RenderIssues {...props} />
                </>
              )}
              {!props.fetchIssuesInProgress && props.issueList === null && (
                <Paper className={classes.paper}>No issues available</Paper>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export { IssuesComponent };
