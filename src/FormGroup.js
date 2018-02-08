import React, {Component} from 'react'
import axios from 'axios'

class FormGroup extends Component{
  constructor(){
    super()
    this.state = {
      text: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  changeHandler(e){
    this.setState({
      text:e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
  
    let newTodo = {
      text: this.state.text, 
      done: false
    }
    
  
  
    if (newTodo.text !==''){
  
      axios.post('http://localhost:8080/newitem', {
        text: newTodo.text,
        done: newTodo.done
      })
        .then(result => {
          console.log(result)
          let copy = Array.from(this.props.todos);
                  copy.unshift(result.data);
                
                  this.setState({
                    todos: copy,
                  });        
        })
        .catch(error => {
          console.log(error, "error")
        })
  
    }else{
      alert('please enter a valid todo')
    }
  
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
          <div className="input-group">
              <span className="input-group-btn">
                  <button className="btn btn-primary" type="submit">Add</button>
              </span>
              <input onChange={this.changeHandler} className="form-control" placeholder="add a todo" />
          </div>
      </form>
    )
  }
}

export default FormGroup
