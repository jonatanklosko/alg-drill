import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Drill from '../Drill/Drill';
import Home from '../Home/Home';
import NewDrill from '../NewDrill/NewDrill';
import EditDrill from '../EditDrill/EditDrill';

function Navigation() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/drills/new">
        <NewDrill />
      </Route>
      <Route path="/drills/:id/edit">
        <EditDrill />
      </Route>
      <Route path="/drill/:id">
        <Drill />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;
