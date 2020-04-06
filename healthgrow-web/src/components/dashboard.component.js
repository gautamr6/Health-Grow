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

  const Journal = props => (
    <tr>
      <td>{props.journal.title}</td>
      <td>{props.journal.test}</td>
      <td>
        <Link to={"/edit/"+props.journal._id}>edit</Link> | <a href="#" onClick={() => { props.deleteJournal(props.journal._id) }}>delete</a>
      </td>
    </tr>
  )

  const Admin = props => (
    <tr>
      <td>{props.admin.email}</td>
      <td>
        <Link to={"/edit/"+props.admin._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAdmin(props.admin._id) }}>delete</a>
      </td>
    </tr>
  )

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.state = {workouts: [], journals: [], admins: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/workouts/')
         .then(response => {
           this.setState({ workouts: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/journals/')
         .then(response => {
           this.setState({ journals: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/admins/')
         .then(response => {
           this.setState({ admins: response.data });
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

      deleteJournal(id) {
        axios.delete('http://localhost:5000/journals/'+id)
          .then(res => console.log(res.data));
        this.setState({
          journals: this.state.journals.filter(el => el._id !== id)
        })
      }
      deleteAdmin(id) {
        axios.delete('http://localhost:5000/admins/'+id)
          .then(res => console.log(res.data));
        this.setState({
          admins: this.state.admins.filter(el => el._id !== id)
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
        <h3>Logged Journals</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.journalList() }
          </tbody>
        </table>
        <h3>Admins</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.adminList() }
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

  journalList() {
    return this.state.journals.map(currentjournal => {
      return <Journal journal={currentjournal} deleteJournal={this.deleteJournal} key={currentjournal._id}/>;
    })
  }

  adminList() {
    return this.state.admins.map(currentadmin => {
      return <Admin admin={currentadmin} deleteAdmin={this.deleteAdmin} key={currentadmin._id}/>;
    })
  }
}