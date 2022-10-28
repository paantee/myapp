import { useState, useRef } from 'react';
import React from 'react';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import format from 'date-fns/format';

export default function TodoList() {

  const gridRef = useRef();
  const [desc, setDesc] = useState({description: '', date: '', priority: ''});
  const [todos, setTodos] = useState('');
  const [open, setOpen] = useState(false);
 
  const columns = [  
    { field: "description", sortable: true, filter: true },  
    { field: "date", sortable: true, filter: true,
        valueFormatter: params => format(new Date(params.value), "dd.MM.yyyy") },  
    { field: "priority", sortable: true, filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
  ]


const addTodo = (event, params) => {
  setTodos([desc, ...todos]);
}

const deleteTodo = () => {
  if (gridRef.current.getSelectedNodes().length > 0) {
  setTodos(todos.filter((todo, index) =>
  index !== gridRef.current.getSelectedNodes()[0].childIndex));
  setOpen(true);
  } else {
    alert('Select row first!');
  }
}

  return (
<body>
  <h1>Add todo</h1>
    <div className="App">
  <Stack 
    direction="row"
    spacing={2}
    alignItems="center"
    justifyContent="center">
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Enter date"
        inputFormat='dd.MM.yyyy'
        value={desc.date}
        onChange={value => setDesc({...desc, date: value})} 
        renderInput={(params) => <TextField {...params} />}
      />
     </LocalizationProvider>

      <TextField 
        label="Description"
        variant="standard"
        name="description"
        value={desc.description}
        onChange={e => setDesc({... desc, description: e.target.value})}/>

      <TextField
        label="Priority"
        variant="standard"
        name="priority"
        value={desc.priority}
        onChange={e => setDesc({... desc, priority: e.target.value})}/>
      <Button startIcon={<AddIcon/>} onClick={addTodo} variant="contained">Add</Button>
      <Button startIcon={<DeleteIcon/>} onClick={deleteTodo} variant="contained">Delete</Button>
      
      
      </Stack>
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