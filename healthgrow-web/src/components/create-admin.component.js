import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          email: ''
        };
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newAdmin = {
          email: this.state.email,
        };
        console.log(newAdmin);

        axios.post('http://localhost:5000/admins/add', newAdmin)
        .then(res => console.log(res.data));
        
        this.setState({
          email: ''
        })
      }

  render() {
    return (
        <div>
        <h3>Create New Admin</h3>
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
            <input type="submit" value="Create Admin" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}