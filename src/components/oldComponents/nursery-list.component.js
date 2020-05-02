import React, { Component } from 'react';
import { Switch, Route, Link, useRouteMatch} from "react-router-dom";
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import CreateTray from "./create-tray.component";
import EditPlant from "../components/edit-plant.component";

// import "bootstrap/dist/css/bootstrap.min.css";

const Server = "http://localhost:1337/";

const Plant = props => {
  // const deletePlant = (thisPlant) => {
  //   axios.delete(Server + 'plants/remove/' + thisPlant)
  //     .then(console.log("Plant had be removed"))
  //     .catch(function (error){
  //       console.log(error);
  //     })
  // }
  let { path } = useRouteMatch();


  return (
    <tr>
      <td>{props.plant.plant_species}</td>
      <td>{props.plant.seed_pot}</td>
      <td>{props.plant.sow_date}</td>
      <td>{props.plant.stepUp}</td>
      <td>{props.plant.condition}</td>
      <td><Link to={`${path}/edit/` + props.plant._id}>Edit</Link></td>
      {/* <td><button onClick={deletePlant(props.plant._id)}>Remove</button></td> */}
      <td></td>
    </tr>
  )
}

function Header() {

  let { path, url } = useRouteMatch();


return(
  <Container style={{ marginTop: 20 }}>
    <Row>
      <Col sm={12}>
      <span ><Link className="nav-item" to={url}>Plant List</Link></span>
      &nbsp;&nbsp;&nbsp;
      <span><Link className="text-danger" to={`${url}/germination`}>Germination List</Link></span>
      &nbsp;&nbsp;&nbsp;
      <span><Link className="text-success" to={`${url}/notes`}>Notes</Link></span>
      &nbsp;&nbsp;&nbsp;
      <span className="float-right"><Link className="text-warning" to={`${url}/add-plants`}>Add PLant</Link></span>
      </Col>
    </Row>
    <Switch>
      <Route exact path={path}>
        <div>
          <h3>Please select a topic.</h3>
          <PlantList/>
        </div>
      </Route>
      <Route path={`${path}/germination`}>
        <div>
          <Topic/>
        </div>
      </Route>
      <Route path={`${path}/notes`}>
        <div>
          Notes
        </div>
      </Route>
      <Route path={`${path}/add-plants`}>
        <CreateTray/>
      </Route>

    </Switch>
  </Container>
)}

export default Header;

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  // let { topicId } = useParams ();

  return (
    <div>
      <h3>Test Test Test</h3>
    </div>
  );
}

class PlantList extends Component {
  constructor(props) {
    super(props);
      this.removePlant = this.removePlant.bind(this);
      // this.onChangeSearch = this.onChangeSearch.bind(this);
      this.state = {
        plants: [],
        // search: 'Search'
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

  // onChangeSearch(e) {
  //   this.setState({
  //     search: e.target.value
  //   });
  // }

  removePlant() {
    console.log('yay');
  }

  // handleDelete= () => {
  //   axios.post('http://localhost/trays/remove'+this.props.match.params.id)
  //     .then(res => console.log(res.data));
  // };

  tableHeader() {
    const dataSample = {
      'Tray ID': '',
      'Species Name': '',
      'Common Name': '',
      'Quantity': '',
      'Germination Rate': '',
    }
    const tableHeaders = [];

    for(const header in dataSample){
      if (header !== "_id" && header !== "__v"){
        tableHeaders.push(<th key={header}>{header}</th>);
      }
    }
    tableHeaders.push(<th key={"edit"}></th>);
    tableHeaders.push(<th key={"remove"}></th>);
    return tableHeaders;
  }

  plant_List() {
    // how can i make this into components
    const plantData = this.state.plants.map(function(plant, index) {



      return (
        <Plant plant={plant} key={index} />
      )
    })

    return plantData;
  }

  render() {
    // make it so rerend after submit hit in create
    return (
      <Container style={{ marginTop: 20 }}>
        {/* <Row>
          <Col sm={12}>
          <h3 ><Link to={"/"}>Plant List</Link></h3>
          <h3 ><Link to={"/nursery/germination"}>Germination List</Link></h3>
          </Col>
        </Row> */}
        <Row>
          <Col sm={9}>
            <input type='text' value={this.state.search} onChange={this.onChangeSearch}/>
            <table className="table table-striped" style={{ marginTop: '20px' }} >
              <thead>
                <tr>
                  { this.tableHeader() }
                  {/* <th>Plant Species</th>
                  <th>Seeds/Pot</th>
                  <th>Sowing date</th>
                  <th>Stepped Up</th>
                  <th>Condition</th>
                  <th></th>
                  <th></th> */}
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
