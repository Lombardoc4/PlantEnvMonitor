import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import CreateTray from "./create-tray.component";
import "bootstrap/dist/css/bootstrap.min.css";

const Server = "http://10.17.84.23:1337/";

var Tray = props => (
  <tr>
    <td>{props.tray.plant_species}</td>
    <td>{props.tray.grams_of_seed}</td>
    <td>{props.tray.germ_date}</td>
    <td>{props.tray.light_date}</td>
    <td>{props.tray.harvest_date}</td>
    <td>{props.tray.yield}</td>
    <td>{props.tray.plant_species}</td>
    <td><Link to={"/edit/" + props.tray._id}>Edit</Link></td>
    <td></td>
  </tr>
)

export default class PlantList extends Component {
  constructor(props) {
    super(props);
      this.state = {trays: []};
  }

  componentDidMount() {
    var serverLocation = Server + 'trays/';
    axios.get(serverLocation)
      .then(res => {
        this.setState({ trays: res.data });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };

  plant_List() {
    return this.state.trays.map(function(currentTray, tray) {
      return <Tray tray={currentTray} key={tray._id} />
    })
  }

  render() {
    return (
    <Router>
      <div>
        <h3 >Plant List</h3>
        <Link to="/create">New Tray</Link>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Plant Species</th>
              <th>Grams of Seed</th>
              <th>Germination Date</th>
              <th>Light Date</th>
              <th>Harvest Date</th>
              <th>Yield</th>
              <th></th>
              <th><button>Remove</button></th>
            </tr>
          </thead>
          <tbody>
            { this.plant_List() }
          </tbody>
        </table>
        <br/>
        <Route path="/create" component = {CreateTray} />
      </div>
      </Router>
    )
  }
}
