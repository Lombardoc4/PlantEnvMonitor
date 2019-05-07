import React, { Component } from 'react';
import axios from 'axios';


const Server = "http://192.168.1.165:1337/";

export default class CreateTray extends Component {
  constructor(props) {
    super(props);

    this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
    this.onChangeNumOfPots = this.onChangeNumOfPots.bind(this);
    this.onChangeSeedPot = this.onChangeSeedPot.bind(this);
    this.onChangeSowDate = this.onChangeSowDate.bind(this);
    this.onChangeStepUp = this.onChangeStepUp.bind(this);
    this.onChangeSource = this.onChangeSource.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        plant_species: '',
        num_of_pots: '',
        seed_pot: '',
        sow_date: '',
        stepUp: '',
        source: '',
        condition: 'Happy'
      }
  }

  onChangePlantSpecies(e) {
    this.setState({
      plant_species: e.target.value
    });
  }
  onChangeNumOfPots(e) {
    this.setState({
      num_of_pots: e.target.value
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
      Condition: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    for (var i = 1; i <= this.state.num_of_pots; i++) {

    var newPlant = {
      plant_species: this.state.plant_species,
      seed_pot: this.state.seed_pot,
      sow_date: this.state.sow_date,
      stepUp: this.state.stepUp,
      source: this.state.source,
      condition: this.state.condition
    };
    console.log(newPlant);

    var serverLocation = Server + 'nursery/add';
    axios.post(serverLocation, newPlant)
      .then(res => console.log(res.data));
    }

    this.setState({
      plant_species: '',
      num_of_pots: '',
      seed_pot: '',
      sow_date: '',
      stepUp: '',
      source: '',
      condition: ''
    })
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>New Planting</h3>
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
            <label># of Pots: </label>
            <input  type="number"
                    className="form-control"
                    value={this.state.num_of_pots}
                    onChange={this.onChangeNumOfPots}
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
            <input type="submit" value="Create Planting" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
