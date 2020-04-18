import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Challenge = props => (
  <tr>
    <td>{props.challenge.content}</td>
    <td>{props.challenge.pointValue}</td>
    <td>{props.challenge.timeBegin}</td>
    <td>{props.challenge.timeExpire}</td>
    <td>
      <Link to={"/edit/"+props.challenge._id}>edit</Link> | <a href="#" onClick={() => { props.deleteChallenge(props.challenge._id) }}>delete</a>
    </td>
  </tr>
)

const Workout = props => (
    <tr>
      <td>{props.workout.email}</td>
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
      <td>{props.journal.email}</td>
      <td>{props.journal.title}</td>
      <td>{props.journal.text}</td>
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

  const User = props => (
    <tr>
      <td>{props.user.email}</td>
      <td>{props.user.password}</td>
      <td>{props.user.name}</td>
      <td>
        <Link to={"/edit/"+props.user._id}>edit</Link> | <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )

  const Achievement = props => (
    <tr>
      <td>{props.achievement.model}</td>
      <td>{props.achievement.field}</td>
      <td>{props.achievement.operator}</td>
      <td>{props.achievement.condition}</td>
      <td>
        <Link to={"/edit-achievement/"+props.achievement._id}>edit</Link> | <a href="#" onClick={() => { props.deleteAchievement(props.achievement._id) }}>delete</a>
      </td>
    </tr>
  )

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deleteChallenge = this.deleteChallenge.bind(this);
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteAchievement = this.deleteAchievement.bind(this);
        this.state = {challenges: [], workouts: [], journals: [], admins: [], users: [], achievements: []};
      }

      componentDidMount() {
        axios.get('http://localhost:5000/challenges/')
         .then(response => {
           this.setState({ challenges: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

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

         axios.get('http://localhost:5000/users/')
         .then(response => {
           this.setState({ users: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/achievements/')
         .then(response => {
           this.setState({ achievements: response.data });
         })
         .catch((error) => {
            console.log(error);
         })
      }

      deleteChallenge(id) {
        axios.delete('http://localhost:5000/challenges/'+id)
          .then(res => console.log(res.data));
        this.setState({
          challenges: this.state.challenges.filter(el => el._id !== id)
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
      deleteUser(id) {
        axios.delete('http://localhost:5000/users/'+id)
          .then(res => console.log(res.data));
        this.setState({
          users: this.state.users.filter(el => el._id !== id)
        })
      }
      deleteAchievement(id) {
        axios.delete('http://localhost:5000/achievements/'+id)
          .then(res => console.log(res.data));
        this.setState({
          achievements: this.state.achievements.filter(el => el._id !== id)
        })
      }

  render() {
    return (
        <div>
        <h3>Daily Challenges</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Content</th>
              <th>Point Value</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.challengeList() }
          </tbody>
        </table>
        <h3>Logged Workouts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Email</th>
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
              <th>Email</th>
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
        <h3>Users</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.userList() }
          </tbody>
        </table>
        <h3>Achievements</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Model</th>
              <th>Field</th>
              <th>Operator</th>
              <th>Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.achievementList() }
          </tbody>
        </table>
      </div>
    )
  }

  challengeList() {
    return this.state.challenges.map(currentchallenge => {
      return <Challenge challenge={currentchallenge} deleteChallenge={this.deleteChallenge} key={currentchallenge._id}/>;
    })
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

  userList() {
    return this.state.users.map(currentuser => {
      return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
    })
  }

  achievementList() {
    return this.state.achievements.map(currentachievement => {
      return <Achievement achievement={currentachievement} deleteAchievement={this.deleteAchievement} key={currentachievement._id}/>;
    })
  }
}