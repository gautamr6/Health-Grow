import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-faux-dom';
import axios from 'axios';
import * as d3 from "d3"; 
import '../App.css'; 

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
        this.deleteWorkout = this.deleteWorkout.bind(this);
        this.deleteJournal = this.deleteJournal.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteAchievement = this.deleteAchievement.bind(this);
        this.onChangeUserSearch = this.onChangeUserSearch.bind(this);
        this.state = {
          allworkouts: [], 
          alljournals: [], 
          admins: [], 
          allusers: [], 
          achievements: [],
          usersearch: "",
          workouts: [], 
          journals: [], 
          users: [], 
          data: []
        };
      }

      onChangeUserSearch(e) {
        this.setState({
          usersearch: e.target.value
        }, function() { // execute after state is updated (also checkout componentDidUpdate)
          this.setState({
            workouts: this.state.allworkouts.filter(workout =>
              workout.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            journals: this.state.alljournals.filter(journal =>
              journal.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            ),
            users: this.state.allusers.filter(user =>
              user.email.toLowerCase().includes(this.state.usersearch.toLowerCase())
            )
           }, function () {
            this.setState({
             data: [
               {
                 name: 'Total Workouts',
                 value: this.uniqueWorkouts()
               },
                   {
                     name: 'Total Reps',
                     value: this.repsSum()
                   },
                   {
                     name: 'Total Weight',
                     value: this.weightSum()
                   }
                   
                 ]
            });
           });
           
        }
        );
      }

      componentDidMount() {
        axios.get('http://localhost:5000/workouts/')
         .then(response => {
           this.setState({ 
             allworkouts: response.data, 
             workouts: response.data
            });

           this.setState({
            data: [
              {
                name: 'Total Workouts',
                value: this.uniqueWorkouts()
              },
                  {
                    name: 'Total Reps',
                    value: this.repsSum()
                  },
                  {
                    name: 'Total Weight',
                    value: this.weightSum()
                  }
                  
                ]
           });
           
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/journals/')
         .then(response => {
           this.setState({ 
             alljournals: response.data,
             journals: response.data
             });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/admins/')
         .then(response => {
           this.setState({ 
             admins: response.data 
            });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/users/')
         .then(response => {
           this.setState({ 
             allusers: response.data,
             users: response.data 
            });
         })
         .catch((error) => {
            console.log(error);
         })

         axios.get('http://localhost:5000/achievements/')
         .then(response => {
           this.setState({ 
             achievements: response.data 
            });
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
          <form>
          <div className="form-group"> 
            <label><h3>User Search</h3></label>
            <input  type="text"
                className="form-control"
                onChange={this.onChangeUserSearch}
                />
          </div>
        </form>
        <h3>Logged Workouts</h3>
        
        {this.drawChart()}
      
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

  workoutList() {
    return this.state.workouts.map(currentworkout => {
  
      return <Workout workout={currentworkout} deleteWorkout={this.deleteWorkout} key={currentworkout._id}/>;
      
    })
  }

  plot(chart, width, height) {  
    // create scales!
    const xScale = d3.scaleBand()
        .domain(this.state.data.map(d => d.name))
        .range([0, width]);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.state.data, d => d.value)])
        .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    chart.selectAll('.bar')
        .data(this.state.data)
        .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', d => xScale(d.name))
        .attr('y', d => yScale(d.value))
        .attr('height', d => (height - yScale(d.value)))
        .attr('width', d => xScale.bandwidth())
        .style('fill', (d, i) => colorScale(i));

    chart.selectAll('.bar-label')
        .data(this.state.data)
        .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', d => xScale(d.name) + xScale.bandwidth()/2)
        .attr('dx', 0)
        .attr('y', d => yScale(d.value))
        .attr('dy', -6)
        .text(d => d.value);

    const xAxis = d3.axisBottom()
        .scale(xScale);
        
    chart.append('g')
        .classed('x axis', true)
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    const yAxis = d3.axisLeft()
        .ticks(5)
        .scale(yScale);

    chart.append('g')
        .classed('y axis', true)
        .attr('transform', 'translate(0,0)')
        .call(yAxis);

    chart.select('.x.axis')
        .append('text')
        .attr('x',  width/2)
        .attr('y', 60)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Name');    
        
    chart.select('.y.axis')
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
        .attr('fill', '#000')
        .style('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Total');   
        
    const yGridlines = d3.axisLeft()
        .scale(yScale)
        .ticks(5)
        .tickSize(-width,0,0)
        .tickFormat('')

    chart.append('g')
        .call(yGridlines)
        .classed('gridline', true);
}

drawChart() {
    const width = 800;
    const height = 450;

    const el = new Element('div');
    const svg = d3.select(el)
        .append('svg')
        .attr('id', 'chart')
        .attr('width', width)
        .attr('height', height);

    const margin = {
        top: 60,
        bottom: 100,
        left: 80,
        right: 40
    };

    const chart = svg.append('g')
        .classed('display', true)
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
}

  uniqueWorkouts() {
    var counts = {};
    for (var i = 0; i < this.state.workouts.length; i++) {
        counts[this.state.workouts[i].workout] = 1 + (counts[this.state.workouts[i].workout] || 0);
    }
    // return Object.keys(counts).length;
    return Object.keys(counts).reduce((sum,key)=>sum+parseFloat(counts[key]||0),0);
  }

  repsSum() {
    var sum = 0;
    this.state.workouts.forEach(currentworkout => {
      sum += currentworkout.reps;
    });
    return sum;
  }

  weightSum() {
    var sum = 0;
    this.state.workouts.forEach(currentworkout => {

      sum += currentworkout.weight;
      
    });
    return sum;
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