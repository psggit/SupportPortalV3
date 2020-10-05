import { createMuiTheme } from "@material-ui/core/styles";
import "./app.scss";

const font = "Open Sans";

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0086AD",
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
