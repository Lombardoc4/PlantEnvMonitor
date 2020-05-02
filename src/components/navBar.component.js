import React from 'react';
import { Link } from "react-router-dom";

// import ClientButton from "./clientButton.component";
// import EntryModal from './entryModal.component';

const NavBar = () => (

  <div style={{ backgroundColor: '#edffd5', boxShadow: '0 0 5px ' }} >

    <nav className="container navbar navbar-expand-md navbar-light" style={{ height: '60px', fontSize: '20px'}}>
      <Link className="navbar-brand" to="/">Plant Monitor</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse navbar-nav" id="navbarTogglerDemo02">
          <Link to="/supplies" className="nav-item nav-link">Supplies</Link>
          <Link to="/nursery" className="nav-item nav-link">Nursery</Link>
          <Link to="/monitor" className="nav-item nav-link">Environment</Link>
        {/* <ClientButton showModal={this.displayEntry}/> */}
      </div>
    </nav>

            {/* <div className = {userEntryClass}>
              {<EntryModal closeModal={this.displayEntry} entry={this.state.userEntryDisplay}/> }
            </div> */}
  </div>
);

export default NavBar;
