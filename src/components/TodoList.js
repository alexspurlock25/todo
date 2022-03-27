import { useState, useEffect } from "react"
import db from '../firebase.config'

import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import ListGroup from "react-bootstrap/ListGroup"

function TodoList() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos().then((data) => {
            setTodos(data)
        })
    })

    async function getTodos() {
        const notesSnapshot = await getDocs(query(collection(db, "todo"), orderBy('id', 'desc')));
        const notesList = notesSnapshot.docs.map((doc) => doc.data());
        return notesList;
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

