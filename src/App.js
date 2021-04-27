import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "views/Login/Login";

import "assets/css/material-dashboard-react.css?v=1.9.0";

export default function App() {
  const hist = createBrowserHistory();

  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}
