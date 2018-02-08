import React, {Component} from 'react'

class SelectField extends Component{
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind(this)
  }
  changeHandler(e){
    this.props.selectHandler(e.target.value)
  }
  render(){
    return (
      <select onChange={this.changeHandler}>
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="complete">complete</option>
      </select>
    )
  }
}

export default SelectField
