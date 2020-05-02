import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';



const Server = "http://localhost:1337/";

const Plant = props => (
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
    var listLength = this.state.plants.length;
    var i = 1;
    var initial = true;

    return this.state.plants.map(function(currentPlant, plant) {

      if (initial) {
        lastPlant = {
          plant_species: currentPlant.plant_species,
          seed_pot: currentPlant.seed_pot,
          sow_date: currentPlant.sow_date,
          stepUp: currentPlant.stepUp,
          condition: currentPlant.condition,
          repeat: lastPlant.repeat
        }

      }

      var deleteUser = (thisPlant) => {
        axios.delete(Server + 'plants/remove/' + thisPlant)
          .then(console.log("Plant had be removed"))
          .catch(function (error){
            console.log(error);
          })
      }

      var plus = lastPlant.repeat;


      if((initial || i < listLength) && lastPlant.plant_species === currentPlant.plant_species){
        console.log(initial);
initial = false;
        console.log(lastPlant.plant_species);
        console.log(currentPlant.plant_species);

        plus = plus + 1;
        lastPlant = {
          repeat: plus
        }
        i = i + 1;
        lastPlant = {
          plant_species: currentPlant.plant_species,
          seed_pot: currentPlant.seed_pot,
          sow_date: currentPlant.sow_date,
          stepUp: currentPlant.stepUp,
          condition: currentPlant.condition,
          repeat: lastPlant.repeat
        }
        return null;
      }
            //
            // if(i < listLength){
            //
            //   plus = plus + 1;
            //   lastPlant = {
            //     repeat: plus
            //   }
            //   i = i + 1;

            //   return
            // }

      else {
        lastPlant = {
          plant_species: lastPlant.plant_species,
          seed_pot: lastPlant.seed_pot,
          sow_date: lastPlant.sow_date,
          stepUp: lastPlant.stepUp,
          condition: lastPlant.condition,
          repeat: 0
        }
        i = i + 1;

          return <Plant deleteUser={deleteUser} value ={plus} plant={lastPlant} key={plant._id} />
      }
    })
  }

  render() {
    // make it so rerend after submit hit in create
    return (

      <div>
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
        </div>
    )
  }
}
