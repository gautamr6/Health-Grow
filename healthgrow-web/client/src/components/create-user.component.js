import React, { Component } from 'react';
import axios from 'axios';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeIsAdmin = this.onChangeIsAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          email: '',
          password: '',
          name: '',
          isadmin: false
        };
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
      onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }
      onChangeIsAdmin(event) {
        const target = event.target;
        const value = target.name === 'isadmin' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newUser = {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          isadmin: this.state.isadmin
        };
        console.log(newUser);

        axios.post(`${hostname}/api/users/add`, newUser)
        .then(res => console.log(res.data));
        
        this.setState({
          email: '',
          password: '',
          name: '',
          isadmin: false
        })
      }

  render() {
    return (
        <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group"> 
            <label>Is Admin:</label>
            <input
              name="isadmin"
              type="checkbox"
              className="form-control"
              checked={this.state.isadmin}
              onChange={this.onChangeIsAdmin} />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}