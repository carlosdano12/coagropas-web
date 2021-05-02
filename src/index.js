import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { UserContextProvider } from "contextApi/UserContext";

ReactDOM.render(
  <React.Fragment>
    <SnackbarProvider hideIconVariant maxSnack={4}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SnackbarProvider>
  </React.Fragment>,
  document.getElementById("root")
);
