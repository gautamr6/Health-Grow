import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workout = props => (
    <tr>
      <td>{props.workout.workout}</td>
      <td>{props.workout.reps}</td>
      <td>{props.workout.weight}</td>
      <td>
        <Link to={"/edit/"+props.workout._id}>edit</Link> | <a href="#" onClick={() => { props.deleteWorkout(props.workout._id) }}>delete</a>
      </td>
    </tr>
  )

export default class WorkoutsList extends Component {
    constructor(props) {
        super(props);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.state = {workouts: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/workouts/')
         .then(response => {
           this.setState({ workouts: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteWorkout(id) {
        axios.delete('http://localhost:5000/workouts/'+id)
          .then(res => console.log(res.data));
        this.setState({
          workouts: this.state.workouts.filter(el => el._id !== id)
        })
      }

  render() {
    return (
        <div>
        <h3>Logged Workouts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Workout</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.workoutList() }
          </tbody>
        </table>
      </div>
    )
  }

  workoutList() {
    return this.state.workouts.map(currentworkout => {
      return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>;
    })
  }
}