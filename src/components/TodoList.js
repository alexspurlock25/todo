import { useState, useEffect } from "react"
import db from '../firebase.config'

import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"

import Todo from '../components/Todo'

const data = [
    { id: 1, title: "Todo 1", desc: "Todo 1 desc", isDone: false },
    { id: 2, title: "Todo 2", desc: "Todo 1 desc", isDone: true },
    { id: 3, title: "Todo 3", desc: "Todo 1 desc", isDone: false }
]

function TodoList() {
    const [todos, setTodos] = useState(data)

    // useEffect(() => {
        // getTodos().then((data) => {
        //     setTodos(data)
        // })
    // })

    // async function getTodos() {
    //     const notesSnapshot = await getDocs(query(collection(db, "todo"), orderBy('id', 'desc')));
    //     const notesList = notesSnapshot.docs.map((doc) => doc.data());
    //     return notesList;
    // }

    function handleDelete(id) {
        const filteredTodos = todos.filter(todo => todo.id != id)
        setTodos(filteredTodos)
    }

    function handleIsDone(id) {
        let todoIndex = todos.findIndex(todo => todo.id === id)
        let newArr = todos
        newArr[todoIndex] = { ...newArr[todoIndex], isDone: !newArr[todoIndex].isDone}
        setTodos(newArr)
    }
    
    return (
        <ListGroup variant="flush" className="w-50 m-auto pt-5">
            {
                todos.map(todo => 
                    <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone}/>
                )
            }
        </ListGroup>
    )
}

export default TodoList