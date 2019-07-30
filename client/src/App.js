import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Layout
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

//Styling
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import "./App.css";

//Content

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  mobileStepper: {
    margin: theme.spacing(3, 0, 3),
    background: "white"
  }
}));

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Router>
            <CssBaseline />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} {...classes} />
            </Switch>
          </Router>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
