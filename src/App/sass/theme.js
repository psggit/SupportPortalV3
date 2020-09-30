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
  },
  error: {
    ".MuiFormHelperText-root": {
      color: "#f44336",
    },
  },
});

export default newTheme;
