import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

const Garden = props => (
    <tr>
      <td>{props.garden.title}</td>
      <td>{props.garden.level}</td>
      <td>{props.garden.image}</td>
      <td>
        <Link to={"/edit/"+props.garden._id}>edit</Link> | <a href="#" onClick={() => { props.deleteGarden(props.workout._id) }}>delete</a>
      </td>
    </tr>
  )

export default class Gardens extends Component {
    constructor(props) {
        super(props);
        this.deleteGarden = this.deleteGarden.bind(this);
        this.state = {gardens: [], workouts: [], journals: [], admins: [], users: [], achievements: []};
      }

      componentDidMount() {
        axios.get(`${hostname}/api/gardens/`)
         .then(response => {
           this.setState({ gardens: response.data });
         })
         .catch((error) => {
            console.log(error);
         })

       
      }

      deleteGarden(id) {
        axios.delete(`${hostname}/api/gardens/`+id)
          .then(res => console.log(res.data));
        this.setState({
          gardens: this.state.gardens.filter(el => el._id !== id)
        })
      }

  render() {
    return (
        <div>
        <h3>Gardens</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Level</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.gardenList() }
          </tbody>
        </table>
      </div>
    )
  }

  gardenList() {
    return this.state.gardens.map(currentgarden => {
      return <Garden garden={currentgarden} deleteGarden={this.deleteGarden} key={currentgarden._id}/>;
    })
  }
}