import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateTray from "./create-tray.component";
// import "bootstrap/dist/css/bootstrap.min.css";

const Server = "http://localhost:1337/";

var Plant = props => (
  <tr>
    <td>{props.plant.plant_species}</td>
    <td>{props.plant.seed_pot}</td>
    <td>{props.plant.sow_date}</td>
    <td>{props.plant.stepUp}</td>
    <td>{props.plant.condition}</td>
    <td><Link to={"/edit/" + props.plant._id}>Edit</Link></td>
    <td><button onClick={() => props.deleteUser(props.plant._id)}>Remove</button></td>
    <td></td>
  </tr>
)

export default class PlantList extends Component {
  constructor(props) {
    super(props);
      this.removePlant = this.removePlant.bind(this);
      this.onChangeSearch = this.onChangeSearch.bind(this);
      this.state = {
        plants: [],
        search: 'Search'
      };
  }

  componentDidMount() {
    var serverLocation = Server + 'nursery/';
    axios.get(serverLocation)
      .then(res => {
        this.setState({ plants: res.data });
      })
      .catch(function (error){
        console.log(error);
      });
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    });
  }

  removePlant() {
    console.log('yay');
  }

  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };

  plant_List() {
    // how can i make this into components
    return this.state.plants.map(function(currentPlant, plant) {

      var deleteUser = (thisPlant) => {
        axios.delete(Server + 'plants/remove/' + thisPlant)
          .then(console.log("Plant had be removed"))
          .catch(function (error){
            console.log(error);
          })
      }
      return <Plant deleteUser={deleteUser} plant={currentPlant} key={plant._id} />
    })
  }

  render() {
    // make it so rerend after submit hit in create
    return (

      <Container>
      <Row>
      <Col sm={9}>
        <h3 >Plant List</h3>
        <input type='text' value={this.state.search} onChange={this.onChangeSearch}/>
        <table className="table table-striped" style={{ marginTop: 20 }} >
          <thead>
            <tr>
              <th>Plant Species</th>
              <th>Seeds/Pot</th>
              <th>Sowing date</th>
              <th>Stepped Up</th>
              <th>Condition</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { this.plant_List() }
          </tbody>
        </table>
        <br/>
      </Col>
      <Col sm={3}>
          <CreateTray/>
      </Col>
      </Row>
      </Container>
    )
  }
}
