import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Welcome from"./components/welcome.component";
import NavBar from "./components/navBar.component";
import Nursery from "./components/nursery.component";
import Supplies from "./components/supplies.component";
import EnvData from "./components/environment.component";
// import background from "./header.jpg"

import 'bootstrap/dist/css/bootstrap.min.css';

// const backgroundStyle = {
//   backgroundImage: 'url(' + background + ')',
//   backgroundSize: 'contain'
// }

const App = () => (
  <Router>
    <div>
      <header className="bg-white sticky-top">
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/nursery" component={Nursery} />
        <Route path="/supplies" component={Supplies} />
        {/* <Route path="/nursery/germination" >
        <h1> Testing testing 123</h1>
        </Route> */}
        <Route path="/monitor" component = {EnvData} />
      </Switch>
    </div>
  </Router>
);

export default App;