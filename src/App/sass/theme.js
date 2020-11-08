import { createMuiTheme } from "@material-ui/core/styles";
import "./app.scss";

const font = "Open Sans";

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0086AD",
    },
    secondary: {
      main: "#696969",
    },
    secondary2: {
      main: "#010B13",
    },
  },
  typography: {
    fontFamily: font,
    body1: {
      fontFamily: font,
      fontSize: "16px",
      ".MuiTableCell-head": {
        fontWeight: 700,
      },
    },
    body2: {
      color: "#606060",
      ".MuiTypography-root": {
        ".MuiListItemText-secondary": {
          color: "#606060",
        },
      },
    },
    h5: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      fontSize: "14px",
      textTransform: "none",
      fontWeight: 700,
    },
    subtitle1: {
      color: "#606060",
      fontSize: 12,
      lineHeight: "2.2em",
    },
    mapLabel: {
      color: "#fff",
      fontSize: 12,
    },
  },
  overrides: {
    MuiTableCell: {
      head: {
        padding: "4px 8px",
        backgroundColor: "#E5E5E5",
        fontFamily: font,
        fontWeight: 700,
        height: "64px",
      },
    },
  },
});

export default newTheme;
