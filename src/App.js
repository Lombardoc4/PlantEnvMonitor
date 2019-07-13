import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import Welcome from"./components/welcome.component";
import Nursery from "./components/nursery-list.component";
import PlantList from "./components/plant-list.component";
import EditPlant from "./components/edit-plant.component";
import EnvData from "./components/environment.component";

import logo from "./logo.JPG";


class App extends Component {
  render() {

    return (
      <Router>
        <div >
          <nav className="navbar navbar-expand-xl navbar-light bg-transparent" style={{fontSize: '25px'}}>
            <a className="navbar-brand" target="_blank">
            <Link to="/">
              <img src={logo} width="30" height="30" alt="/" />
            </Link>
            </a>
            <Link to="/" className="navbar-brand">Plant Environment Monitor</Link>

            <div className="collpase navbar-collapse" >
              <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/nursery/plants" className="nav-link">Plants</Link>
              </li>
              <li className="navbar-item">
                <Link to="/nursery" className="nav-link">Nursery</Link>
              </li>
                <li className="navbar-item">
                  <Link to="/monitor" className="nav-link">Environment</Link>
                </li>
              </ul>

              <button type="button" class="btn btn-success btn-lg mx-1">Sign In</button>
              <button type="button" class="btn btn-primary btn-lg mx-1" >Sign Up</button>
            </div>

          </nav>
          <Route path="/" exact component={Welcome} />
          <Route path="/nursery" exact component={Nursery} />
          <Route path="/nursery/plants" component={PlantList} />
          <Route path="/edit/:id" component={EditPlant} />
          <Route path="/monitor" component = {EnvData} />
        </div>
      </Router>
    );
  }
}

export default App;
