import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuDrawer from "./menuDrawer";
import { logo } from "../assets/images/";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 65,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hipbarLogo: {
    marginTop: "8px",
    cursor: "pointer",
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const history = useHistory();

  const handleLogo = () => {
    history.push("/dashboard");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar disableGutters={true}>
          <MenuDrawer />
          <div className={classes.hipbarLogo} onClick={handleLogo}>
            <img src={logo} />
          </div>
          {/* <img src={logo} /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
