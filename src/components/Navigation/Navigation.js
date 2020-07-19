import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Drill from '../Drill/Drill';
import Home from '../Home/Home';
import NewDrill from '../NewDrill/NewDrill';
import EditDrill from '../EditDrill/EditDrill';
import Layout from '../Layout/Layout';

function Navigation() {
  return (
    <Layout>
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
        <Route path="/drills/:id">
          <Drill />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
}

export default Navigation;
