import React, { Component } from "react";
import axios from "axios";

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      logged_in: 0,
      is_admin: false,
      curr_user: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    console.log("login with email: " + email + ", pw: " + password);

    axios.get(`${hostname}/api/users/`)
    .then(response => {
      this.setState({ users: response.data });
      var temp = this.state.users.filter(u => u.email == email && u.password == password)
      if (temp.length > 0) {
        this.setState({
            logged_in: 1,
            curr_user: temp[0].email
          });
        if (temp[0].isadmin == true) {
          this.setState({
              is_admin: true
            });
          } else {
            this.setState({
              is_admin: false
            });
          }
          //window.location = '/dashboard';
      } else {
        this.setState({
            logged_in: -1
          });
          //window.location = '/';  
      }
      console.log("logged in?: " + this.state.logged_in)
      console.log("is admin: " + this.state.is_admin)

    }).catch(error => {
        console.log("login error", error);
      });

    
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>User Login</h3>
        <form onSubmit={this.handleSubmit}>
        
        <label>Email: </label>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </div>

        <label> Password: </label>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}