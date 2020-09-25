import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import newTheme from "../sass/theme";

export default function CustomButton(props) {
  return (
    <ThemeProvider theme={newTheme}>
      <Button color="primary">{props.children}</Button>
    </ThemeProvider>
  );
}
