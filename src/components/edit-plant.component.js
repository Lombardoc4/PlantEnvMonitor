import React, { Component } from 'react';
import axios from 'axios';

export default class EditPlant extends Component {

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
    componentDidMount() {
      axios.get('http://localhost:4000/trays/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          plant_species: res.data.plant_species,
          grams_of_seed: res.data.grams_of_seed,
          germ_date: res.data.germ_date,
          light_date: res.data.light_date,
          harvest_date: res.data.harvest_date,
          yield: res.data.yield
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

      var newTray = {
        plant_species: this.state.plant_species,
        grams_of_seed: this.state.grams_of_seed,
        germ_date: this.state.germ_date,
        light_date: this.state.light_date,
        harvest_date: this.state.harvest_date,
        yield: this.state.yield
      };
      console.log(newTray);
      axios.post('http://localhost/trays/update'+this.props.match.params.id, newTray)
        .then(res => console.log(res.data));

      this.props.history.push('/');
    }

    render() {
      return (
        <div style={{marginTop: 10}}>
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
              <input type="submit" value="Update Tray" className="btn btn-primary" />
            </div>
          </form>
        </div>
      )
    }
  }
