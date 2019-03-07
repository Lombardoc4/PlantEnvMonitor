import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTray extends Component {
  constructor(props) {
    super(props);

    this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
    this.onChangeGramsOfSeed = this.onChangeGramsOfSeed.bind(this);
    this.onChangeGermDate = this.onChangeGermDate.bind(this);
    this.onChangeLightDate = this.onChangeLightDate.bind(this);
    this.onChangeHarvestDate = this.onChangeHarvestDate.bind(this);
    this.onChangeYield = this.onChangeYield.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        plant_species: '',
        grams_of_seed: '',
        germ_date: '',
        light_date: '',
        harvest_date: '',
        yield: ''
      }
  }

  onChangePlantSpecies(e) {
    this.setState({
      plant_species: e.target.value
    });
  }
  onChangeGramsOfSeed(e) {
    this.setState({
      grams_of_seed: e.target.value
    });
  }
  onChangeGermDate(e) {
    this.setState({
      germ_date: e.target.value
      });
  }
  onChangeLightDate(e) {
    this.setState({
      light_date: e.target.value
    });
  }
  onChangeHarvestDate(e) {
    this.setState({
      harvest_date: e.target.value
    });
  }
  onChangeYield(e) {
    this.setState({
      yield: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`PLant Species: ${this.state.plant_species}`);
    console.log(`Grams of Seed: ${this.state.grams_of_seed}`);
    console.log(`Germination Date: ${this.state.germ_date}`);
    console.log(`Light Date: ${this.state.light_date}`);
    console.log(`Harvest Date: ${this.state.harvest_date}`);
    console.log(`Yield: ${this.state.yield}`);

    var newTray = {
      plant_species: this.state.plant_species,
      grams_of_seed: this.state.grams_of_seed,
      germ_date: this.state.germ_date,
      light_date: this.state.light_date,
      harvest_date: this.state.harvest_date,
      yield: this.state.yield
    };

    axios.post('http://127.0.0.1:4000/trays/add', newTray)
      .then(res => console.log(res.data));

    this.setState({
      plant_species: '',
      grams_of_seed: '',
      germ_date: '',
      light_date: '',
      harvest_date: '',
      yield: ''
    })
  }

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Create New Plant Tray</h3>
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
            <label>Grams Of Seed: </label>
            <input  type="number"
                    className="form-control"
                    value={this.state.grams_of_seed}
                    onChange={this.onChangeGramsOfSeed}
                    />
          </div>
          <div className="form-group">
            <label>Germination Date (MM/DD/YY): </label>
            <input  type="string"
                    className="form-control"
                    value={this.state.germ_date}
                    onChange={this.onChangeGermDate}
                    />
          </div>
          <div className="form-group">
            <label>Light Date (MM/DD/YY): </label>
            <input  type="string"
                    className="form-control"
                    value={this.state.light_date}
                    onChange={this.onChangeLightDate}
                    />
          </div>
          <div className="form-group">
            <label>Harvest Date (MM/DD/YY): </label>
            <input  type="string"
                    className="form-control"
                    value={this.state.harvest_date}
                    onChange={this.onChangeHarvestDate}
                    />
          </div>
          <div className="form-group">
            <label>Yield (in Oz): </label>
            <input  type="number"
                    className="form-control"
                    value={this.state.yield}
                    onChange={this.onChangeYield}
                    />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Tray" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
