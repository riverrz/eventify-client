import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "theme/index";
import Navbar from "components/Navbar";

function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {children}
    </ThemeProvider>
  );
}

export default Page;
