import React, { Component } from 'react';
import axios from 'axios';

export default class SetChallenge extends Component {
    constructor(props) {
        super(props);
        this.onChangeChallenge = this.onChangeChallenge.bind(this);
        this.onChangePointValue = this.onChangePointValue.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          challenge: '',
          pointValue: 0,
          start: new Date(),
          end: new Date()
        };
      }

      onChangeChallenge(e) {
        this.setState({
          challenge: e.target.value
        });
      }
      onChangePointValue(e) {
        this.setState({
          pointValue: e.target.value
        });
      }
      onChangeStart(e) {
        this.setState({
          start: e.target.value
        });
      }
      onChangeEnd(e) {
        this.setState({
          end: e.target.value
        });
      }
      onSubmit(e) {
        e.preventDefault();
        const newChallenge = {
          content: this.state.challenge,
          pointValue: this.state.pointValue,
          timeBegin: this.state.start,
          timeExpire: this.state.end
        };
        console.log(newChallenge);

        axios.post('http://localhost:5000/challenges/add', newChallenge)
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
            <label>Point Value: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.pointValue}
                onChange={this.onChangePointValue}
                />
          </div>
          <div className="form-group">
            <label>Begin Time: </label>
            <input  type="date"
                required
                className="form-control"
                value={this.state.start}
                onChange={this.onChangeStart}
                />
          </div>
          <div className="form-group">
            <label>End Time: </label>
            <input  type="date"
                required
                className="form-control"
                value={this.state.end}
                onChange={this.onChangeEnd}
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
