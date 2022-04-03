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
    const collectionRef = collection(db, 'todo')
    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [todos]);

    async function getTodos() {    
        // This did not work for me. It had weird side effects on other functions suchs as add, remove and isDone
        // onSnapshot(collectionRef, (snapshot) =>
        //     setTodos(snapshot.docs.map((doc) => doc.data()))
        // );
        // TODO: Figure out why this functions is reading the firestore documents 48K times
        await getDocs(collectionRef).then(snaps => {
            setTodos(snaps.docs.map(doc => doc.data()))
        })
    }

    async function handleAdd() {
        await addDoc(collectionRef, { id: uuid(), title: title, isDone: false })
        setTitle('')
    }

    async function handleDelete(todoId) {
        const q = query(collectionRef, where("id", "==", todoId));
        
        await getDocs(q).then(response => {
            const docRef = response.docs[0].ref
            deleteDoc(docRef)
        })
    }

    async function handleIsDone(todoId) {
        const q = query(collectionRef, where("id", "==", todoId));
        const docsRef = getDocs(q)
        await docsRef.then(docs => {
            docs.forEach(item => {
                const docId = item.id
                const isDone = item.data()['isDone']
                const docRef = doc(db, `todo/${docId}`)
                updateDoc(docRef, {isDone: !isDone})
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
                {
                    todos.map(todo => <Todo key={todo.id} todo={todo} deleteFun={handleDelete} isDoneFun={handleIsDone}/>)
                }
            </ListGroup>
        </Container>
    )
}

export default TodoList