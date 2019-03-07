import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import PlantList from "./components/plant-list.component";
import EditPlant from "./components/edit-plant.component";
import CreateTray from "./components/create-tray.component";
import EnvData from "./components/environment.component";

import logo from "./logo.JPG";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="./" target="_blank">
              <img src={logo} width="30" height="30" alt="./" />
            </a>
            <Link to="/" className="navbar-brand">Plant Environment Monitor</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Plants</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">New Tray</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/monitor" className="nav-link">Environment Data</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={PlantList} />
          <Route path="/edit/:id" component={EditPlant} />
          <Route path="/monitor" component = {EnvData} />
          <Route path="/create" component={CreateTray} />
        </div>
      </Router>
    );
  }
}

export default App;