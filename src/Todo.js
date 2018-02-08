import React, {Component} from 'react'
import './App.css'

class Todo extends Component{
  render(){
    return (
      <li className="list-group-item">
          <input onChange={()=>this.props.checkHandler(this.props.i)} checked={this.props.done} type="checkbox" value="on" />
          <label className={this.props.done ? 'done' : ''}>{this.props.text}</label>
      </li>
    )
  }
}

export default Todo
