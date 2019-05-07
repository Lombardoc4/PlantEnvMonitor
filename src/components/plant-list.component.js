import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateTray from "./create-tray.component";
// import "bootstrap/dist/css/bootstrap.min.css";

const Server = "http://10.17.84.23:1337/";

var Plant = props => {

  (
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
)}

export default class PlantList extends Component {
  constructor(props) {
    super(props);
      this.removePlant = this.removePlant.bind(this);
      this.onChangeSearch = this.onChangeSearch.bind(this);
      this.state = {
        plants: [],
        search: 'Search',
        repeat: 0
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

  plant_List() {
    var lastPlant = {
      plant_species: '',
      seed_pot: '',
      sow_date: '',
      stepUp: '',
      condition: '',
      repeats: 0
    }
    return this.state.plants.map(function(currentPlant) {

      var deleteUser = (thisPlant) => {
        axios.delete(Server + 'nursery/remove/' + thisPlant)
          .then(console.log("Plant had be removed"))
          .catch(function (error){
            console.log(error);
          })
      }

      if (lastPlant.plant_species == currentPlant.plant_species &&
          lastPlant.seed_pot === currentPlant.seed_pot &&
          lastPlant.sow_date === currentPlant.sow_date &&
          lastPlant.stepUp === currentPlant.stepUp &&
          lastPlant.condition === currentPlant.condition) {
            lastPlant = {
              repeat: repeat + 1

            }
          }

      lastPlant = {
        plant_species: currentPlant.plant_species,
        seed_pot: currentPlant.seed_pot,
        sow_date: currentPlant.sow_date,
        stepUp: currentPlant.stepUp,
        condition: currentPlant.condition,
      }




      return <Plant deleteUser={deleteUser} plant={currentPlant} key={plant._id} />
    })
  }

  render() {
    return (

      <Container>
      <Row>
      <Col sm={8}>
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
      <Col sm={4}>
          <CreateTray/>
      </Col>
      </Row>
      </Container>
    )
  }
}
