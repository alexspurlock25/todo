import { useState, useEffect } from "react";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ListGroup from "react-bootstrap/ListGroup";

function TodoList() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        getTodos(db)
    })

    async function getTodos(db) {
        const todoCol = collection(db, 'todo');
        const todoSnapshot = await getDocs(todoCol);
        const todoList = todoSnapshot.docs.map(doc => doc.data());
        setTodos(todoList)
    }
    
    return (
        <ListGroup variant="flush">
            {
                todos.map(todo => <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>)
            }
        </ListGroup>
    );
}

export default TodoList;

