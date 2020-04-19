import React, { Component } from 'react';
import axios from 'axios';

const hostname = String(window.location.href).includes("localhost") ? 'http://localhost:5000' : String(window.location.href).substring(0, String(window.location.href).indexOf("/", 8));

export default class EditGarden extends Component {
  constructor(props) {
    super(props);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeOperator= this.onChangeOperator.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: '',
      field: '',
      operator: '',
      condition: 0,
      models: ['User', 'Workout', 'Journal'],
      operators: ['==', '<', '<=', '>', '>=']
    }
  }

  componentDidMount() {
    axios.get(`${hostname}/api/gardens/`+this.props.match.params.id)
      .then(response => {
        this.setState({
          model: response.data.model,
          field: response.data.field,
          operator: response.data.operator,
          condition: response.data.condition
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeField(e) {
    this.setState({
      field: e.target.value
    });
  }

  onChangeOperator(e) {
    this.setState({
      operator: e.target.value
    });
  }

  onChangeCondition(e) {
    this.setState({
      condition: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const garden = {
        model: this.state.model,
        field: this.state.field,
        operator: this.state.operator,
        condition: this.state.condition
      };

    console.log(garden);

    axios.post(`${hostname}/api/gardens/update/`+this.props.match.params.id, garden).then(function(res)
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
        <h3>Edit Garden</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Model: </label>
            <select ref="modelInput"
                className="form-control"
                value={this.state.model}
                onChange={this.onChangeModel}>
                {
                  this.state.models.map(function(model) {
                    return <option 
                      key={model}
                      value={model}>{model}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Field: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.field}
                onChange={this.onChangeField}
                />
          </div>
          <div className="form-group"> 
            <label>Operator: </label>
            <select ref="operatorInput"
                className="form-control"
                value={this.state.operator}
                onChange={this.onChangeOperator}>
                {
                  this.state.operators.map(function(operator) {
                    return <option 
                      key={operator}
                      value={operator}>{operator}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group">
            <label>Condition: </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.condition}
                onChange={this.onChangeCondition}
                />
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Garden" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}