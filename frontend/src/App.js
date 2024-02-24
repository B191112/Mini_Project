import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./loginPage";
import Home from "./homePage";
import NotFound from "./notFound";
import Jobs from "./jobsPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route Component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
