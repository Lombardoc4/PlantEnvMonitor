import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


const Server = "http://192.168.1.165:1337/";

var Plant = props => (
  <tr>
    <td>{props.plant.plant_species} ({props.value})</td>
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
      this.onChangeSearch = this.onChangeSearch.bind(this);
      this.state = {
        plants: [],
        search: 'Search'
      };
  }

  componentDidMount() {
    var serverLocation = Server + 'nursery/plants';
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


  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };

  plant_List() {
    // how can i make this into components
    var lastPlant = {
      plant_species: '',
      seed_pot: '',
      sow_date: '',
      stepUp: '',
      repeat: 0,
      condition: ''
    }
    var initial = true;
    return this.state.plants.map(function(currentPlant, plant) {

      var deleteUser = (thisPlant) => {
        axios.delete(Server + 'plants/remove/' + thisPlant)
          .then(console.log("Plant had be removed"))
          .catch(function (error){
            console.log(error);
          })
      }
      var plus = lastPlant.repeat;



      if(initial || lastPlant.plant_species === currentPlant.plant_species){
        plus = plus + 1;
        lastPlant = {
          repeat: plus
        }
        initial = false;
      }
      else {
        lastPlant = {
          repeat: 0
        }
        initial = true;
        // put return here ??
      }

        lastPlant = {
          plant_species: currentPlant.plant_species,
          seed_pot: currentPlant.seed_pot,
          sow_date: currentPlant.sow_date,
          stepUp: currentPlant.stepUp,
          condition: currentPlant.condition,
          repeat: lastPlant.repeat
        }

              return <Plant deleteUser={deleteUser} value={plus} plant={currentPlant} key={plant._id} />
    })
  }

  render() {
    // make it so rerend after submit hit in create
    return (

      <Container>
      <Row>
      <Col>
        <h3 >Plant List</h3>
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
      </Row>
      </Container>
    )
  }
}
