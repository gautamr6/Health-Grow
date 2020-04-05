import React, { Component } from 'react';
import axios from 'axios';

export default class CreateWorkout extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangeWorkout = this.onChangeWorkout.bind(this);
    this.onChangeReps = this.onChangeReps.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
    //   userEmail: '',
      workout: '',
      reps: 0,
      weight: 0,
    //   users: []
    }
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/users/')
    // .then(response => {
    //   if (response.data.length > 0) {
    //     this.setState({ 
    //       users: response.data.map(user => user.username),
    //       username: response.data[0].username
    //     });
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }

//   onChangeUserEmail(e) {
//     this.setState({
//       userEmail: e.target.value
//     });
//   }

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
    //   userEmail: this.state.userEmail,
      workout: this.state.workout,
      reps: this.state.reps,
      weight: this.state.weight
    };
  
    console.log(workout);
    axios.post('http://localhost:5000/workouts/add', workout)
  .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Workout Log</h3>
        <form onSubmit={this.onSubmit}>
          {/* <div className="form-group"> 
            <label>UserEmail: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.userEmail}
                onChange={this.onChangeUserEmail}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div> */}
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
            <input type="submit" value="Create Workout Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}