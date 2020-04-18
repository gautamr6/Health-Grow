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
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="navbar-item">
          <Link to="/admin" className="nav-link">Create Admin</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/journal" className="nav-link">Create Journal</Link>
          </li>
          <li className="navbar-item">
          <Link to="/achievement" className="nav-link">Create Achievement</Link>
          </li>
          <li className="navbar-item">
          <Link to="/garden" className="nav-link">Create Garden</Link>
          </li>
          <li className="navbar-item">
          <Link to="/gardens" className="nav-link">Gardens</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}