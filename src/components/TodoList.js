import { useEffect, useState } from "react"
import uuid from "react-uuid"
import ListGroup from "react-bootstrap/ListGroup"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container"
import Todo from '../components/Todo'
import { addDoc, collection, deleteDoc, where, query, doc, getDocs, updateDoc } from 'firebase/firestore'

import { db } from '../firebase.config'

function TodoList() {
    const rootDir = 'todo'
    const collectionRef = collection(db, rootDir)
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, []);

    function getTodos() {
        // TODO: Figure out if its normal for this to run infinitely
        getDocs(collectionRef)
            .then(snaps => {
                const firestoreTodos = snaps.docs.map(doc => doc.data())
                setTodos(firestoreTodos)
                console.log('getDocs()')
            })
    }

    function handleAdd() {
        addDoc(collectionRef, { id: uuid(), title: title, isDone: false } )
            .then(() => setTitle('') )
    }

    function handleDelete(todoId) {
        getDocs( query(collectionRef, where("id", "==", todoId)) )
            .then(response => deleteDoc(response.docs[0].ref) )
    }

    function handleIsDone(todoId) {
        getDocs( query(collectionRef, where("id", "==", todoId)) )
            .then(documents => {
                documents.forEach(document => {
                    const docRef = doc(db, `${rootDir}/${document.id}`)
                    updateDoc(docRef, {isDone: !document.data()['isDone']})
                })
            })
    }
    
    return (
        <Container>
            <Container className="d-flex justify-content-center mt-5" fluid>
                <Form className="d-flex align-items-center">
                    <Form.Control className="me-2" type="text" placeholder="Add Todo..." value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Button variant="primary" onClick={handleAdd}>Add</Button>
                </Form>
            </Container>
            <ListGroup variant="flush" className="w-50 m-auto pt-5">
                { todos.map(todo => <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone}/>) }
            </ListGroup>
        </Container>
    )
}

export default TodoList