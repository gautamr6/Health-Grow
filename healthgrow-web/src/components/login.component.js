import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      logged_in: 0
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

    axios.get('http://localhost:5000/users/')
    .then(response => {
      this.setState({ users: response.data });
      console.log(this.state.users);
      var temp = this.state.users.filter(u => u.email == email && u.password == password)
      if (temp.length > 0) {
        this.setState({
            logged_in: 1
          });
        history.push("/dashboard")
      } else {
        this.setState({
            logged_in: -1
          });
      }
      console.log("logged in?: " + this.state.logged_in)

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