

import React, { useEffect } from 'react';
import { useState } from 'react';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [age, setAge] = useState("");
    
    const saveInfo = () => {
        // call api to save information in backend
        fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: newTodo,
                age: age
            })
        }).then(res => res.json())
            .then((data) => {
                setTodos([...todos, data]);// for stoping the refreess the page.
                setNewTodo("");
            });
        
    };

    useEffect(() => {
            fetch("http://localhost:8080/users?")       
            .then(res => res.json())
            .then((data) => {
                setTodos(data)
            });
    }, []);
    return <div>Todos
        <div>
            <div style={{border:"1px solid red"}}>
                <input value={newTodo} onChange={({ target }) => setNewTodo(target.value)} />
                <input value={age} onChange= {({target}) => setAge(target.value)} />
                <button onClick={saveInfo}>+</button>
            </div>
            {todos.map(todo => (
                <div key={todo.id}>{todo.name} : { todo.age }</div>  
            ))}
        </div>
    </div>
  
};

export default Todos;
 