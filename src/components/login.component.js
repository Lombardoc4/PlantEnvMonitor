import React, { Component } from 'react';
import axios from 'axios';

const Server = "http://localhost:1337/";

export default class Login extends Component {

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
