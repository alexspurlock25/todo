import { useEffect, useState } from "react"
import uuid from "react-uuid"
import ListGroup from "react-bootstrap/ListGroup"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container"
import Todo from '../components/Todo'
import { addDoc, collection, deleteDoc, getDoc, where, query, onSnapshot, Timestamp, doc, documentId, getDocs } from 'firebase/firestore'

import { db } from '../firebase.config'


function TodoList() {
    const collectionRef = collection(db, 'todo')
    const [add, setAdd] = useState(false)
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [add]);

    function getTodos() {    
        onSnapshot(collectionRef, (snapshot) =>
            setTodos(snapshot.docs.map((doc) => doc.data()))
        );
    }

    async function handleAdd() {
        // TODO: empty title text box on add
        await addDoc(collectionRef, { id: uuid(), title: title, isDone: false })
        setAdd(true)
    }

    async function handleDelete(id) {
        // TODO: get delete to work
        console.log(`ID: ${id} to delete...`)
    }

    function handleIsDone(id) {
        // TODO: get this to work with firebase, not with a local array
        const todoIndex = todos.findIndex(todo => todo.id === id)
        const newArr = todos
        newArr[todoIndex] = { ...newArr[todoIndex], isDone: !newArr[todoIndex].isDone}
        setTodos(newArr)
        return newArr[todoIndex].isDone
    }

    function handleIsDoneStr(id) {
        const docRef = documentId()
        console.log(docRef)
        // const todoIndex = todos.findIndex(todo => todo.id === id)
        // console.log(todos[todoIndex].isDone)
        // return todos[todoIndex].isDone
    }
    
    return (
        <Container>
            <Container className="d-flex justify-content-center mt-5" fluid>
                <Form className="d-flex align-items-center">
                    <Form.Control className="me-2" type="text" placeholder="Add Todo..." onChange={(e) => setTitle(e.target.value)} />
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Form>
            </Container>
            <ListGroup variant="flush" className="w-50 m-auto pt-5">
                {
                    todos.map(todo => <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone} isDoneStrFun={handleIsDoneStr}/>)
                }
            </ListGroup>
        </Container>
    )
}

export default TodoList