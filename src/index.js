import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserContextProvider } from "contextApi/UserContext";

ReactDOM.render(
  <React.Fragment>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.Fragment>,
  document.getElementById("root")
);
