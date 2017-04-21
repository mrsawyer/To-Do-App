import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const ToDo = ({item, toggleComplete, removeToDo}) => {
  return <li >{item.title}
    <input
      type="checkbox"
      id={item.id}
      checked={item.complete}
      onChange={toggleComplete} 
      />
    <label htmlFor={item.id}></label>
    <button
    onClick={removeToDo}>
      <i className="fa fa-trash"></i>
    </button>
  </li>;
}

const ClearButton = ({removeCompleted}) => {
  return <button onClick={removeCompleted}>Clear Completed Items</button>;
}

const ToDoCount = ({number}) => {
  return <p>{number} { number > 1 || number < 1 ? 'Items' : 'Item' } still to do</p>
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      todos: [{ id: 0, title: 'Learn React', complete: false }],
      lastId: 0,
      inputValue: ''
    }
    this.removeCompleted = this.removeCompleted.bind(this);
    this.addToDo = this.addToDo.bind(this);
  }

  toggleComplete(item) {
    let newTodos = this.state.todos.map((todo) => {
      todo.complete = todo.id === item.id ? todo.complete = !todo.complete : todo.complete;
      return todo;
    });
    this.setState({todos: newTodos})
  }

  removeToDo(item) {
    let newTodos = this.state.todos.filter((todo) => {return todo.id !== item.id;});
    this.setState({todos: newTodos})
  }

  removeCompleted() {
    let newTodos = this.state.todos.filter((todo) => !todo.complete);
    this.setState({todos: newTodos});
  }

  hasCompleted() {
    let newTodos = this.state.todos.filter((todo) => todo.complete);
    return newTodos.length > 0 ? true : false; 
  }

  onInputChange(event) {
    this.setState({inputValue: event.target.value});

  }

  addToDo(event) {
    event.preventDefault();
    if(this.state.inputValue){
      const id = this.state.lastId + 1;
      const newTodos = this.state.todos.concat({
        id,
        title: this.state.inputValue,
        complete: false
      });
      this.setState({
        todos: newTodos,
        lastId: id
      });
      this.setState({inputValue: ''});
    }
  }

  // componentDidMount(){
  //   this.toDoInput.focus();
  // }

  // <input type="text" ref={(input) => (this.toDoInput = input)} />

  render() {
    return (
      <div className="todo-list">
        <h1>So Many Things To Do</h1>
        <div className="add-todo">
          <form name="addTodo" onSubmit={this.addToDo}>
            <input type='text' value={this.state.inputValue} onChange={(e) => this.onInputChange(e)} />
            <span>(press enter to add)</span>
          </form>
        </div>
        <ul className="App">
          {this.state.todos.map((todo, i) => (
            <ToDo 
            item={todo} 
            key={i}
            toggleComplete={() => this.toggleComplete(todo)}
            removeToDo={() => this.removeToDo(todo)} />
            ))}
        </ul>
        <div className='todo-admin'>
          <ToDoCount number={this.state.todos.length} />
          {this.hasCompleted() &&
            <ClearButton removeCompleted={() => this.removeCompleted()} />
          }
        </div>
      </div>
    );
  }
}
ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

ToDo.propTypes = {
  item: PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          complete: PropTypes.bool
        }).isRequired,
  toggleComplete: PropTypes.func,
  removeToDo: PropTypes.func
};

ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

export default App;
