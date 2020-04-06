import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">HealthGrow</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Workout Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/admin" className="nav-link">Create Admin</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}