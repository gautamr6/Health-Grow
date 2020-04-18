import React, { Component } from 'react';
import axios from 'axios';

export default class SetChallenge extends Component {
    constructor(props) {
        super(props);
        this.onChangeChallenge = this.onChangeChallenge.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          challenge: ''
        };
      }

      onChangeChallenge(e) {
        this.setState({
          challenge: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newAdmin = {
          content: this.state.challenge,
        };
        console.log(newAdmin);

        axios.post('http://localhost:5000/challenges/add', newAdmin)
        .then(res => console.log(res.data));

        this.setState({
          email: ''
        })
      }

  render() {
    return (
        <div>
        <h3>Set Daily Challenge</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Challenge: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.challenge}
                onChange={this.onChangeChallenge}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Set" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
