import './App.css';
import { useState } from 'react';
import React from 'react';
import TodoTable from "./TodoTable";

function App() {

  const [desc, setDesc] = React.useState({description: '', date: ''});
  const [todos, setTodos] = React.useState('');

const inputChanged = (event) => {
  setDesc({...desc, [event.target.name]: event.target.value});
}

const addTodo = (event) => {
  event.preventDefault();
  setTodos([...todos, desc]);
}

const deleteTodo = (row) => {
  console.log({row});
  setTodos(todos.filter((todo, index) => row !== index));
}

  return (
<body>
  <h1>Add todo</h1>
    <div className="App">
      <form onSubmit={addTodo} class="form">
        <label for="description" name="description">Description</label><br/>
        <input name="description" type="text" value={desc.description} onChange={inputChanged}/><br/>
        <label for="description" name="description">Date</label><br/>
        <input placeholder="Date" name="date" type="text" value={desc.date} onChange={inputChanged}/><br/>
        <input type="submit" value="Add"/>
      </form>
      <br/>
      <TodoTable deleteTodo={deleteTodo} todos={todos}/>
    </div>
</body>
  );
}

export default App;
