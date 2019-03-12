import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class PlantList extends Component {

  constructor(props) {
    super(props);
      this.state = {trays: []};
  }

  componentDidMount() {
    axios.get('http://localhost:4000/trays/')
      .then(res => {
        this.setState({ trays: res.data });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  handleDelete= () => {
    axios.post('http://localhost/trays/remove'+this.props.match.params.id)
      .then(res => console.log(res.data));
  };

  plant_List() {
    return this.state.trays.map(tray => (<Tray tray={tray} key={tray._id} handleDelete={this.handleDelete} />;
    ));
  }

  var Tray = ({handleDelete}) => (
    <tr>
      <td>{props.tray.plant_species}</td>
      <td>{props.tray.grams_of_seed}</td>
      <td>{props.tray.germ_date}</td>
      <td>{props.tray.light_date}</td>
      <td>{props.tray.harvest_date}</td>
      <td>{props.tray.yield}</td>
      <td>{props.tray.plant_species}</td>
      <td><Link to={"/edit/" + props.tray._id}>Edit></Link></td>
      <td><button onClick={handleDelete}>Remove</button></td>


  )


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
              <th></th>
              <th></th>
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
