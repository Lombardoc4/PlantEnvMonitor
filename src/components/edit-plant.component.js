import React, { Component } from 'react';
import axios from 'axios';


const Server = "http://192.168.1.165:1337/";

export default class EditPlant extends Component {

    constructor(props) {
      super(props);

      this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
      this.onChangeSeedPot = this.onChangeSeedPot.bind(this);
      this.onChangeSowDate = this.onChangeSowDate.bind(this);
      this.onChangeStepUp = this.onChangeStepUp.bind(this);
      this.onChangeSource = this.onChangeSource.bind(this);
      this.onChangeCondition = this.onChangeCondition.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          plant_species: '',
          seed_pot: '',
          sow_date: '',
          stepUp: '',
          source: '',
          condition: ''
        }
    }
    componentDidMount() {
      var serverLocation = Server + 'nursery/' + this.props.match.params.id;
      axios.get(serverLocation)
      .then(res => {
        this.setState({
          plant_species: res.data.plant_species,
          seed_pot: res.data.seed_pot,
          sow_date: res.data.sow_date,
          stepUp: res.data.stepUp,
          source: res.data.source,
          condition: res.data.condition
        })
      })
      .catch(function (error){
        console.log(error);
      })
    }

    onChangePlantSpecies(e) {
      this.setState({
        plant_species: e.target.value
      });
    }
    onChangeSeedPot(e) {
      this.setState({
        seed_pot: e.target.value
      });
    }
    onChangeSowDate(e) {
      this.setState({
        sow_date: e.target.value
      });
    }
    onChangeStepUp(e) {
      this.setState({
        stepUp: e.target.value
      });
    }
    onChangeSource(e) {
      this.setState({
        source: e.target.value
      });
    }
    onChangeCondition(e) {
      this.setState({
        condition: e.target.value
      });
    }

    onSubmit(e) {
      e.preventDefault();

      var newPlant = {
        plant_species: this.state.plant_species,
        seed_pot: this.state.seed_pot,
        sow_date: this.state.sow_date,
        stepUp: this.state.stepUp,
        source: this.state.source,
        condition: this.state.condition
      };
      console.log(newPlant);

      var serverLocation = Server + 'nursery/update'+this.props.match.params.id;
      axios.post(serverLocation, newPlant)
        .then(res => console.log(res.data));

      this.props.history.push('/');
    }

    render() {
      return (
        <div className="container" style={{marginTop: 10}}>
          <h3>Update Tray Info</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Plant Species: </label>
              <input  type="text"
                      className="form-control"
                      value={this.state.plant_species}
                      onChange={this.onChangePlantSpecies}
                      />
            </div>

            <div className="form-group">
              <label>Seeds per Pot: </label>
              <input  type="number"
                      className="form-control"
                      value={this.state.seed_pot}
                      onChange={this.onChangeSeedPot}
                      />
            </div>
            <div className="form-group">
              <label>Sow Date (MM/DD/YY): </label>
              <input  type="string"
                      className="form-control"
                      value={this.state.sow_date}
                      onChange={this.onChangeSowDate}
                      />
            </div>
            <div className="form-group">
              <label>Step Up (MM/DD/YY): </label>
              <input  type="string"
                      className="form-control"
                      value={this.state.stepUp}
                      onChange={this.onChangeStepUp}
                      />
            </div>
            <div className="form-group">
              <label>Seed Source: </label>
              <input  type="string"
                      className="form-control"
                      value={this.state.source}
                      onChange={this.onChangeSource}
                      />
            </div>
            <div className="form-group">
              <label>Condition: </label>
              <select value={this.state.condition}
                    onChange={this.onChangeCondition}>
                <option value="Happy">Happy</option>
                <option value="Moderate">Slow</option>
                <option value="Sad">Sad</option>
              </select>
            </div>

            <div className="form-group">
              <input type="submit" value="Update Tray" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
    }
  }
