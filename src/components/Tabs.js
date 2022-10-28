import React, { useState } from "react";
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import TodoList from "./TodoList";

function TabApp() {
    
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div class="tabs">
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Home" />
                <Tab value="two" label="Todolist" />
            </Tabs>
            {value === 'one' && <div>Home page</div>}
            {value === 'two' && <div><TodoList/></div>}
        </div>
    );
}

export default TabApp;