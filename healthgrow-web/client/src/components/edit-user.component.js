import React, { Component } from 'react';
import axios from 'axios';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword= this.onChangePassword.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeIsAdmin = this.onChangeIsAdmin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      name: '',
      isadmin: false
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/users/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          password: response.data.password,
          name: response.data.name,
          isadmin: response.data.isadmin
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
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

  onChangeIsAdmin(e) {
    this.setState({
        isadmin: e.target.checked
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      isadmin: this.state.isadmin
    };

    console.log(user);

    axios.post(`${hostname}/api/users/update/`+this.props.match.params.id, user).then(function(res)
        {
          //window.location = '/dashboard';
        }      
      ).catch(function(err) {
        console.log("error");
      });
  }

  render() {
    return (
      <div>
        <h3>Edit User</h3>
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
            <input type="submit" value="Edit User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}