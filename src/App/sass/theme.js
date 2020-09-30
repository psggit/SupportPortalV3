import { createMuiTheme } from "@material-ui/core/styles";
import "./app.scss";

const font = "'Open Sans', sans-serif";

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0086AD",
    },
  },
  typography: {
    fontFamily: font,
    body1: {
      fontSize: "16px",
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      fontSize: "14px",
      textTransform: "none",
      fontWeight: "bold",
      "&.MuiButton-outlinedPrimary": {
        border: "2px solid",
      },
    },
  },
});

export default newTheme;
