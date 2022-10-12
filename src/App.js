import './App.css';
import { useState, useRef } from 'react';
import React from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

function App() {

  const gridRef = useRef();
  const [desc, setDesc] = React.useState({description: '', date: '', priority: ''});
  const [todos, setTodos] = React.useState('');

  const columns = [  
    { field: "description", sortable: true, filter: true },  
    { field: "date", sortable: true, filter: true },  
    { field: "priority", sortable: true, filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
  ]

const inputChanged = (event) => {
  setDesc({...desc, [event.target.name]: event.target.value});
}

const addTodo = (event) => {
  event.preventDefault();
  setTodos([...todos, desc,]);
}

const deleteTodo = () => {
  if (gridRef.current.getSelectedNodes().length > 0) {
  setTodos(todos.filter((todo, index) =>
  index !== gridRef.current.getSelectedNodes()[0].childIndex));
  } else {
    alert('Select row first!');
  }
}

  return (
<body>
  <h1>Add todo</h1>
    <div className="App">
      <form onSubmit={addTodo} class="form">
        <label for="description" name="description">Description</label><br/>
        <input placeholder="description" name="description" type="text" value={desc.description} onChange={inputChanged}/><br/>
        <label for="date" name="date">Date</label><br/>
        <input placeholder="date" name="date" type="text" value={desc.date} onChange={inputChanged}/><br/>
        <label for="priority" name="priority">Priority</label><br/>
        <input placeholder="priority" name="priority" type="text" value={desc.priority} onChange={inputChanged}/><br/>
        <input type="submit" value="Add"/>
        
      </form>
      
      <br/>
      
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material"style={{height: '700px', width: '70%', margin: 'auto'}} >

        <AgGridReact
        animateRows={true}
        ref={gridRef}
        onGridReady={params => gridRef.current = params.api}
        rowSelection='single'
        columnDefs={columns}
        rowData={todos}>
        </AgGridReact>
      </div>
      
      <br/>
      
    </div>
</body>
  );
}

export default App;
