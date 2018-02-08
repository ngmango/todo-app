import React, { Component } from 'react'
import FormGroup from './FormGroup'
import SelectField from './SelectField'
import Todo from './Todo'
import './App.css'
import axios from 'axios'


// {text: 'Do a codealong', done: false, id: 0},
// {text: 'Learn React More', done: false, id: 1},
// {text: 'Grocery Shop', done: false, id: 2},
// {text: 'Feed the Cat', done: false, id: 3}


class App extends Component {
  constructor(){
    super()
    this.state = {
      todos: [],
      text:'',
      select: 'all',
    }
    this.selectHandler = this.selectHandler.bind(this)
    this.checkHandler = this.checkHandler.bind(this)
    // this.addTodo = this.addTodo.bind(this)
    this.removeDone = this.removeDone.bind(this)
  }

  componentWillMount(){
    axios.get('http://localhost:8080/getall')
    .then(result=>{
      console.log(result.data)
      this.setState({
        todos:result.data,
      })
    })
    .catch(error=>{
      console.log(error)
    })
    
  }

  componentDidUpdate(){
    axios.get('http://localhost:8080/getall')
    .then(result=>{
      console.log(result.data)
      this.setState({
        todos:result.data,
      })
    })
    .catch(error=>{
      console.log(error)
    })
    
  }

  // componentDidUpdate(){
  //   axios.get('http://localhost:8080/getall')
  //   .then(result=>{
  //     console.log(result.data)
  //     this.setState({
  //       todos:result.data,
  //     })
  //   })
  //   .catch(error=>{
  //     console.log(error)
  //   })
    
  // }
  
  



  removeDone(){

    let copy = Array.from(this.state.todos);
    let copy2 = [];
    let newList =[];
    for (let i =0;i<copy.length;i++){
      if (!copy[i].done){
        copy2.push(copy[i])
      }else{
        newList.push(copy[i]._id)                
      }
    }

    axios.delete('http://localhost:8080/clear', {
      data: newList
    }).then(res => {
      this.setState({
        todos: copy2,
      })

    })
    .catch(error=>{
      console.log(error);
    })

}
  checkHandler(id){
    /*
      Here the id we get as an argument is the id prop of whichever Todo component we clicked
      on.
    */

    axios.put('http://localhost:8080/updatetodo', {
      data: this.state.todos[id]
    })
      .then(res => {
        console.log(res, "this is the result from the checkhandler")
        let copy = Array.from(this.state.todos)
        copy[id].done = res.data.done
  
      
        this.setState({
          todos: copy
        })
  
      })
      .catch(error => {
      console.log(error)
    })
  }
    
  selectHandler(option){
    /* The option that we are passing into this method as an argument comes from
       our SelectField, and represents the value we got from the onChange event.
    */
    this.setState({
      select: option
    })
  }
  render() {
    /*
      Here we have conditions set out that will dictate the Todos that we render, based
      on the state of 'select'.  In the case of 'all', we are able to map right away, because
      the user wants to see all of the Todos. If we select either of the other options,
      we need to filter the array first, then map it to create our array of JSX elements.
    */
    let todoList;
    if(this.state.select === 'all'){
      todoList = this.state.todos.map((element,i)=>{
        return <Todo key={element._id} checkHandler={this.checkHandler} text={element.text} done={element.done} i={i} id={element._id} />
      })
    }
    else if(this.state.select === 'active'){
      todoList = this.state.todos.filter(element=>{
        return !element.done
      }).map((element,i)=>{
        return <Todo key={element._id} checkHandler={this.checkHandler} text={element.text} done={element.done} i={i} id={element._id} />
      })
    }
    else{
      todoList = this.state.todos.filter(element=>{
        return element.done
      }).map((element,i)=>{
        return <Todo key={element._id} checkHandler={this.checkHandler} text={element.text} done={element.done} i={i} id={element._id} />
      })
    }
    return (
      <div className="container">
        <h1 className="text-center">todos</h1>
        <h3>Total: {this.state.todos.length}</h3>
        <h3>Active: {this.state.todos.reduce((acc,el)=>!el.done?acc+=1:acc,0)}</h3>
        <h3>Complete: {this.state.todos.reduce((acc,el)=>el.done?acc+=1:acc,0)}</h3>
        <FormGroup 
        addTodo={this.addTodo}
        todos={this.state.todos} />
        <ul className="list-group">
          {todoList}
        </ul>
        <SelectField selectHandler={this.selectHandler}/>
        <button disabled={this.state.todos.filter(element=>element.done).length === 0} onClick={this.removeDone} className="pull-right btn btn-default">Clear Complete</button>
      </div>
    );
  }
}

export default App;
