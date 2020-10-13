import React, { useEffect, useState } from "react";
import RetailerDetailsCard from "../../../components/card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "../../../components/dialog";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Card } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import ActivityItem from "../../../components/activityItems";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { getListOfDataObjects } from "../../../utils/helpers";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  formRoot: {
    padding: 24,
  },
  card: {
    width: 520,
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
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  ListItemRoot: {
    width: "100%",
    borderBottom: "1px solid #E5E5E5",
    fontSize: 16,
    color: "#606060",
  },
  ListItem: {
    width: "100%",
    fontSize: 16,
    color: "#606060",
  },
  ListItemTextRoot: {
    wordBreak: "break-word",
  },
  ListItemTextLabel: {
    width: "70%",
  },
  ListItemTextValue: {
    width: "30%",
  },
}));

const keysToRender = [
  "retailer_id",
  "retailer_name",
  "retailer_contact_number",
  "retailer_city_name",
  "retailer_locality",
  "retailer_limit",
  "retailer_address",
];
const keyMap = {
  retailer_id: "Retailer ID",
  retailer_name: "Retailer Name",
  retailer_contact_number: "Mobile Number",
  retailer_city_name: "City",
  retailer_locality: "Landmark",
  retailer_limit: "Retailer Limit",
  retailer_address: "Store Address",
};

const RenderRetailerDetails = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <List>
        {props.retailerDetails.map((item, index) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <ListItem classes={{ root: classes.ListItem }}>
              <ListItemText
                primary={keyMap[keysToRender[index]]}
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
              <ListItemText
                primary={
                  item[keysToRender[index]] ? item[keysToRender[index]] : "-"
                }
                className={classes.ListItemTextRoot}
                classes={{ root: classes.ListItemTextLabel }}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
};

const RetailerDetails = (props) => {
  const [retailerDetailsData, setRetailerDetailsData] = useState([]);
  useEffect(() => {
    props.fetchRetailerNotes(props.orderInfo.order_id);
  }, []);

  useEffect(() => {
    const retailerDetails = getListOfDataObjects(props.orderInfo, keysToRender);
    setRetailerDetailsData(retailerDetails);
  }, []);
  const history = useHistory();
  const classes = useStyles();

  const [showAddNoteDilog, setShowAddNoteDialog] = useState(false);
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleMore = () => {
    history.push("/retailer-notes");
  };

  const mountAddNote = () => {
    setShowAddNoteDialog(true);
  };

  const UnmountAddNote = () => {
    setShowAddNoteDialog(false);
  };

  const retailerAction = [
    // eslint-disable-next-line react/jsx-key
    <Button variant="outlined" color="primary">
      Change Retailer
    </Button>,
    // eslint-disable-next-line react/jsx-key
    // <Button variant="contained" color="primary">
    //   Call
    // </Button>,
  ];

  const retailerNotesAction = [
    // eslint-disable-next-line react/jsx-key
    <div>
      <Button variant="contained" color="primary" onClick={mountAddNote}>
        Add
      </Button>
      <Button variant="contained" color="primary" onClick={handleMore}>
        More
      </Button>
      {showAddNoteDilog && (
        <Dialog
          title="ADD NOTE"
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Button
              variant="contained"
              buttonStyle="secondary"
              onClick={UnmountAddNote}
            >
              Cancel
            </Button>,
            // eslint-disable-next-line react/jsx-key
            <Button
              variant="contained"
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
    </div>,
  ];

  const keysToRenderInNotesCard = ["notes", "created_at"];

  if (props.fetchSuccess) {
    console.log("[RetailerComponent]");
    console.log(props.retailerNotes);
  }

  return (
    <div className={classes.container}>
      <RetailerDetailsCard title="Retailer Details" actions={retailerAction}>
        <RenderRetailerDetails retailerDetails={retailerDetailsData} />
      </RetailerDetailsCard>
      <Card className={classes.card} title="Retailer Notes" variant="outlined">
        {props.fetchSuccess && (
          <ActivityItem
            arr={props.retailerNotes.orderNotes}
            keysToRender={keysToRenderInNotesCard}
            title={"Retailer Notes"}
            actions={retailerNotesAction}
          />
        )}
        {props.fetchProgress && <CircularProgress />}
      </Card>
    </div>
  );
};

RetailerDetails.propTypes = {
  fetchRetailerNotes: PropTypes.func,
  orderInfo: PropTypes.object,
  retailerNotes: PropTypes.object,
  fetchSuccess: PropTypes.bool,
  fetchProgress: PropTypes.bool,
};

export { RetailerDetails };
