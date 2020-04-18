import React, { Component } from 'react';
import axios from 'axios';

export default class EditWorkout extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeWorkout= this.onChangeWorkout.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      workout: '',
      reps: 0,
      weight: 0,
      emails: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/workouts/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          email: response.data.email,
          workout: response.data.workout,
          reps: response.data.reps,
          weight: response.data.weight
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ emails: response.data.map(user => user.email) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeWorkout(e) {
    this.setState({
      workout: e.target.value
    });
  }

  onChangeReps(e) {
    this.setState({
      reps: e.target.value
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const workout = {
      email: this.state.email,
      workout: this.state.workout,
      reps: this.state.reps,
      weight: this.state.weight
    };

    console.log(workout);

    axios.post('http://localhost:5000/workouts/update/'+this.props.match.params.id, workout).then(function(res)
        {
          window.location = '/';
        }      
      ).catch(function(err) {
        console.log("error");
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Workout</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}>
                {
                  this.state.emails.map(function(email) {
                    return <option 
                      key={email}
                      value={email}>{email}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Workout: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.workout}
                onChange={this.onChangeWorkout}
                />
          </div>
          <div className="form-group">
            <label>Reps: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.reps}
                onChange={this.onChangeReps}
                />
          </div>
          <div className="form-group">
            <label>Weight: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.weight}
                onChange={this.onChangeWeight}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Workout" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}