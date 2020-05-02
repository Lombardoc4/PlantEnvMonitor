import React, { Component } from 'react';
// import axios from 'axios';

import logo from "../logo.JPG";

import './login.css'

// const Server = "http://localhost:1337/";

const entryModal = (props) => {
  let entryMode
  const header = props.entry;
  header.replace(/Sign/, 'Sign ');

  if (props.entry === "SignIn")
    entryMode = <SignIn/>
    if (props.entry === "SignUp")
    entryMode = <SignUp/>

  return (
    <div class="loginModal">
      <button class="btn btn-danger" onClick={(e) => props.closeModal("none", e)}>Close Button</button>
      <h3>{header}</h3>
      {entryMode}
        {/* <form onSubmit={this.onSubmit}>
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
        </form> */}
    </div>
  )
}

const SignIn = () => {
  return (
    <div>
      <img class="signInLogo" src={logo} alt="Logo"/>
      <form>
        <input placeholder="Username" type="text"/>
        <input placeholder="Password" type="password"/>
        <input class="btn btn-success" type="submit"/>
      </form>
    </div>
  )
}

const SignUp = () => {
  return (
    <div>
      <form>
        <input placeholder="Username" type="text"/>
        <input placeholder="Password" type="password"/>
        <input placeholder="Email" type="password"/>
        <input class="btn btn-success" type="submit"/>
      </form>
    </div>
  )
}

export default entryModal