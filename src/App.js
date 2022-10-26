import './App.css';
import { useState, useRef } from 'react';
import React from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import TextField from '@mui/material/TextField';
import Button from'@mui/material/Button';

function App() {

  const gridRef = useRef();
  const [desc, setDesc] = React.useState({description: '', date: '', priority: ''});
  const [todos, setTodos] = React.useState('');
  const [date, setDate] = React.useState();
  

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
      
      <TextField label="Date"variant="standard"name="date"value={desc.date}onChange={inputChanged}/>

      <TextField label="Description"variant="standard"name="description"value={desc.description}onChange={inputChanged}/>

      <TextField label="Priority"variant="standard"name="priority"value={desc.priority}onChange={inputChanged}/>
      <Button label="Add" onClick={addTodo}variant="contained" />Add<Button/>
        
     
      


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
