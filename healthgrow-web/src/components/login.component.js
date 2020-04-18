import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    console.log("login");
    console.log("email: " + email);
    console.log("pw: " + password);

    axios.get('http://localhost:5000/users/')
         .then(response => {
           this.setState({ logged_in: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

    // axios
    //   .post(
    //     "http://localhost:3001/sessions",
    //     {
    //       user: {
    //         email: email,
    //         password: password
    //       }
    //     },
    //     { withCredentials: true }
    //   )
    //   .then(response => {
    //     if (response.data.logged_in) {
    //       this.props.handleSuccessfulAuth(response.data);
    //     }
    //   })
    //   .catch(error => {
    //     console.log("login error", error);
    //   });
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