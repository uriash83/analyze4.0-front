import React from "react";
import { Route } from "react-router-dom";

import Main from './containers/Main';
import Dashboard from './components/Dashboard';
import PEC from './components/PEC';
import Settings from './components/Settings';
import RawData from './components/RawData';
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import PrivateRoute  from './components/PrivateRoute'

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Main} />{" "}
    <PrivateRoute exact path="/dashboard" component={Dashboard} />{" "}
    <PrivateRoute exact path="/pec" component={PEC} />{" "}
    <PrivateRoute exact path="/settings" component={Settings} />{" "}
    <PrivateRoute exact path="/rawdata" component={RawData} />{" "}
    
    <Route exact path="/login" component={Login} />{" "}
    <Route exact path="/signup" component={Signup} />{" "}
  </div>
);

export default BaseRouter;