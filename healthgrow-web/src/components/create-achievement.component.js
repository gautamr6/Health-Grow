import React, { Component } from 'react';
import axios from 'axios';

export default class CreateAchievement extends Component {
  constructor(props) {
    super(props);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeOperator = this.onChangeOperator.bind(this);
    this.onChangeCondition = this.onChangeCondition.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      model: 'User',
      field: '',
      operator: '==',
      condition: 0,
      models: ['User', 'Workout', 'Journal'],
      operators: ['==', '<', '<=', '>', '>=']
    }
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeField(e) {
    this.setState({
      model: e.target.value
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
  
    const achievement = {
      model: this.state.model,
      field: this.state.field,
      operator: this.state.operator,
      condition: this.state.condition
    };
  
    console.log(achievement);
    axios.post('http://localhost:5000/achievements/add', achievement).then(function(res)
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
        <h3>Create New Achievement</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Model: </label>
            <select ref="modelInput"
                required
                className="form-control"
                value={this.state.model}
                onChange={this.onChangeModel}>
                {
                  this.state.models.map(function(e) {
                    return <option 
                      key={e}
                      value={e}>{e}
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
                required
                className="form-control"
                value={this.state.operator}
                onChange={this.onChangeOperator}>
                {
                  this.state.operators.map(function(e) {
                    return <option 
                      key={e}
                      value={e}>{e}
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
            <input type="submit" value="Create Achievement" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}