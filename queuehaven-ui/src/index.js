import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, withRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
	<Router history={hist}>
	  <Switch>
		{indexRoutes.map((prop, key) => {
		  return <Route path={prop.path} key={key} component={withRouter(prop.component)} />;
		})}
	  </Switch>
	</Router>
  </Provider>,
  document.getElementById("root")
);
