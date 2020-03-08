import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "theme/index";

function Page({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Page;
