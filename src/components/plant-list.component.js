import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

var Tray = props => (
  <tr>
    <td>{props.tray.plant_species}</td>
    <td>{props.tray.grams_of_seed}</td>
    <td>{props.tray.germ_date}</td>
    <td>{props.tray.light_date}</td>
    <td>{props.tray.harvest_date}</td>
    <td>{props.tray.yield}</td>
    <td><Link to={"/edit/" + props.tray._id}>Edit</Link></td>
  </tr>
)

export default class PlantList extends Component {
  constructor(props) {
    super(props);
      this.state = {trays: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/trays/')
      .then(response => {
        this.setState({ trays: response.data });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  plant_List() {
    return this.state.trays.map(function(currentTray, i){
      return <Tray tray={currentTray} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Plant List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Plant Species</th>
              <th>Grams of Seed</th>
              <th>Germination Date</th>
              <th>Light Date</th>
              <th>Harvest Date</th>
              <th>Yield</th>
            </tr>
          </thead>
          <tbody>
            { this.plant_List() }
          </tbody>
        </table>
      </div>
    )
  }
}
